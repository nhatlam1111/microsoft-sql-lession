import {
  PRESENTATION_PROTOCOL, acceptsPresentationSnapshot, isPresentationMessage,
  presentationFromUrl, presentationShareUrl, presentationStateUrl, transitionPresentation,
  type PresentationAction, type PresentationMessage,
} from '../lib/presentation-state';

const root = document.querySelector<HTMLElement>('[data-presentation]');
if (root) initPresentation(root);

function initPresentation(root: HTMLElement) {
  const elements = [...root.querySelectorAll<HTMLElement>('[data-slide]')];
  if (!elements.length) return;
  const slides = elements.map(element => ({ id: element.id, hasAnswer: !!element.querySelector('details[data-answer]') }));
  const deck = root.dataset.deck ?? '';
  const presenter = root.dataset.mode === 'presenter';
  const initial = presentationFromUrl(new URL(location.href), slides);
  let state = initial.state;
  const run = initial.run ?? (presenter ? crypto.randomUUID() : null);
  let following = !!run && !presenter;
  let lastPresenterRevision = -1;
  let channel: BroadcastChannel | null = null;
  let changingAnswer = false;
  const audienceUrl = new URL(root.dataset.audienceUrl ?? location.pathname, location.origin);
  const notes = root.querySelector<HTMLElement>('[data-notes]');
  const message = root.querySelector<HTMLElement>('[data-message]');
  const status = root.querySelector<HTMLElement>('[data-sync-status]');
  const audienceLink = root.querySelector<HTMLAnchorElement>('[data-audience-link]');

  function tell(text: string) { if (message) message.textContent = text; }
  function send(payload: PresentationMessage) { channel?.postMessage(payload); }
  const envelope = { version: PRESENTATION_PROTOCOL, deck, run: run ?? '' } as const;
  function publish() { if (presenter) send({ ...envelope, type: 'STATE', sender: 'presenter', state }); }
  function requestState() {
    if (following && channel) send({ ...envelope, type: 'REQUEST_STATE', sender: 'audience' });
  }
  function audienceSessionUrl() { return presentationStateUrl(audienceUrl, state, run); }

  function render() {
    const index = slides.findIndex(slide => slide.id === state.slideId);
    changingAnswer = true;
    elements.forEach((element, i) => {
      const current = i === index;
      element.hidden = !current;
      element.classList.toggle('is-current', current);
      const answer = element.querySelector<HTMLDetailsElement>('details[data-answer]');
      if (answer) answer.open = current && state.step === 1;
    });
    changingAnswer = false;
    root.classList.add('is-enhanced');
    root.dataset.step = String(state.step);
    if (notes) {
      notes.replaceChildren();
      const source = elements[index].querySelector<HTMLElement>('[data-presenter-notes]');
      if (source) notes.append(...[...source.childNodes].map(node => node.cloneNode(true)));
    }
    root.querySelectorAll<HTMLElement>('[data-counter]').forEach(el => { el.textContent = `${index + 1} / ${slides.length}`; });
    root.querySelectorAll<HTMLElement>('[data-next-title]').forEach(el => { el.textContent = elements[index + 1]?.dataset.title ?? 'Kết thúc buổi ôn'; });
    root.querySelectorAll<HTMLElement>('[data-current-title]').forEach(el => { el.textContent = elements[index].dataset.title ?? ''; });
    root.querySelectorAll<HTMLElement>('[data-slide-target]').forEach(el => {
      const current = el.dataset.slideTarget === state.slideId;
      if (current) el.setAttribute('aria-current', 'step'); else el.removeAttribute('aria-current');
    });
    if (status) status.textContent = presenter ? 'Người giảng' : following ? 'Theo người giảng' : 'Tự xem';
    root.querySelectorAll<HTMLButtonElement>('[data-action="follow"]').forEach(button => {
      button.hidden = presenter || !run;
      button.disabled = following;
    });
    root.querySelectorAll<HTMLButtonElement>('[data-action="prev"]').forEach(button => { button.disabled = index === 0 && state.step === 0; });
    root.querySelectorAll<HTMLButtonElement>('[data-action="next"]').forEach(button => {
      button.disabled = index === slides.length - 1 && (!slides[index].hasAnswer || state.step === 1);
      button.textContent = slides[index].hasAnswer && state.step === 0 ? 'Hiện lời giải' : 'Tiếp';
    });
    if (audienceLink) audienceLink.href = audienceSessionUrl().href;
    history.replaceState(null, '', presentationStateUrl(new URL(location.href), state, run));
  }

  function navigate(action: PresentationAction) {
    if (!presenter) following = false;
    state = transitionPresentation(slides, state, action);
    render();
    publish();
  }

  if (run && 'BroadcastChannel' in window) {
    try {
      channel = new BroadcastChannel(`sql-presentation:${deck}:${run}`);
      channel.addEventListener('message', event => {
        if (!isPresentationMessage(event.data, deck, run, slides)) return;
        const incoming = event.data;
        if (presenter) {
          if (incoming.type === 'REQUEST_STATE') publish();
        } else if (incoming.type === 'PRESENTER_READY') requestState();
        else if (following && incoming.type === 'STATE' && acceptsPresentationSnapshot(incoming.state, lastPresenterRevision)) {
          lastPresenterRevision = incoming.state.revision;
          state = incoming.state;
          render();
        }
      });
    } catch { tell('Trình duyệt chưa cho đồng bộ hai cửa sổ. Bạn vẫn có thể tự xem bằng các nút điều hướng.'); }
  } else if (run) tell('Trình duyệt không hỗ trợ đồng bộ hai cửa sổ. Bạn vẫn có thể tự xem.');
  if (!channel && !presenter) following = false;

  root.addEventListener('click', event => {
    const target = event.target instanceof Element ? event.target : null;
    const jump = target?.closest<HTMLElement>('[data-slide-target]');
    if (jump?.dataset.slideTarget) { event.preventDefault(); navigate({ slideId: jump.dataset.slideTarget }); return; }
    const button = target?.closest<HTMLElement>('[data-action]');
    if (!button) return;
    const action = button.dataset.action;
    if (action === 'next' || action === 'prev' || action === 'first' || action === 'last') navigate(action);
    else if (action === 'follow') { following = !!channel; render(); requestState(); }
    else if (action === 'open-audience' && presenter) {
      const opened = window.open(audienceSessionUrl(), `sql-presentation-${deck}-${run}`, 'popup,width=1280,height=800');
      if (opened) { tell('Cửa sổ chiếu đã mở. Bạn có thể kéo sang màn hình chiếu.'); opened.focus(); }
      else tell('Trình duyệt đã chặn cửa sổ chiếu. Bấm lại nút mở hoặc dùng liên kết cửa sổ chiếu bên cạnh.');
    } else if (action === 'fullscreen' && !presenter) {
      if (document.fullscreenElement) document.exitFullscreen?.().catch(() => tell('Chưa thoát được toàn màn hình. Bạn có thể nhấn Esc.'));
      else if (root.requestFullscreen) root.requestFullscreen().catch(() => tell('Trình duyệt chưa cho bật toàn màn hình. Tiếp tục chiếu trong cửa sổ.'));
      else tell('Trình duyệt không hỗ trợ toàn màn hình. Tiếp tục chiếu trong cửa sổ.');
    } else if (action === 'copy-link') {
      const url = presentationShareUrl(audienceUrl, state.slideId).href;
      if (navigator.clipboard?.writeText) navigator.clipboard.writeText(url).then(() => tell('Đã sao chép liên kết slide, mở ở đầu câu hỏi.')).catch(() => tell(`Chép liên kết này: ${url}`));
      else tell(`Chép liên kết này: ${url}`);
    }
  });

  // Native details remains usable with no JS and follows the same reveal state with JS.
  elements.forEach(element => {
    const answer = element.querySelector<HTMLDetailsElement>('details[data-answer]');
    answer?.addEventListener('toggle', () => {
      if (changingAnswer || element.id !== state.slideId || answer.open === (state.step === 1)) return;
      if (!presenter) following = false;
      state = { ...state, step: answer.open ? 1 : 0, revision: state.revision + 1 };
      render(); publish();
    });
  });

  document.addEventListener('keydown', event => {
    const target = event.target instanceof Element ? event.target : null;
    if (event.defaultPrevented || event.isComposing || event.key === 'Process' || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey
      || target?.closest('input,textarea,select,[contenteditable]:not([contenteditable="false"]),[role="textbox"]')) return;
    // Keep Space activation native on controls; arrow shortcuts still work after clicking Next.
    if (event.key === ' ' && target?.closest('summary,button,a,[role="button"]')) return;
    const action = ({ ArrowRight: 'next', PageDown: 'next', ' ': 'next', ArrowLeft: 'prev', PageUp: 'prev', Home: 'first', End: 'last' } as const)[event.key];
    if (action) { event.preventDefault(); navigate(action); }
  });
  document.addEventListener('fullscreenchange', () => {
    root.querySelectorAll<HTMLElement>('[data-action="fullscreen"]').forEach(button => {
      button.textContent = document.fullscreenElement ? 'Thoát toàn màn hình' : 'Toàn màn hình';
      button.setAttribute('aria-pressed', String(!!document.fullscreenElement));
    });
  });
  window.addEventListener('pageshow', requestState);
  window.addEventListener('focus', requestState);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') requestState(); });
  // Do not close the channel on pagehide: a restored bfcache page still needs its subscription.
  render();
  if (presenter) { send({ ...envelope, type: 'PRESENTER_READY', sender: 'presenter' }); publish(); }
  else requestState();
}
