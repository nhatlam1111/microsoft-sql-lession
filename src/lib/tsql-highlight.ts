import { lexTsql } from './tsql-lexer';

export type TokenKind = 'keyword' | 'gray' | 'function' | 'string' | 'comment' | 'plain';

const words = (s: string) => new Set(s.split(/\s+/).filter(Boolean));

// The colours SSMS uses by default: blue keywords, grey operators, magenta system functions.
const BLUE = words(`SELECT FROM WHERE AS ON GROUP BY ORDER HAVING TOP DISTINCT INSERT INTO VALUES UPDATE SET DELETE
  CREATE ALTER DROP TABLE VIEW PROCEDURE PROC FUNCTION TRIGGER INDEX PRIMARY KEY FOREIGN REFERENCES CONSTRAINT DEFAULT
  CHECK UNIQUE CLUSTERED NONCLUSTERED BEGIN END TRAN TRANSACTION COMMIT ROLLBACK SAVE DECLARE EXEC EXECUTE RETURN IF ELSE
  WHILE CASE WHEN THEN WITH UNION EXCEPT INTERSECT OVER PARTITION ASC DESC OUTPUT USE PIVOT UNPIVOT FOR SYSTEM_TIME OF
  OFFSET FETCH NEXT ROWS ROW ONLY INT BIGINT SMALLINT TINYINT DECIMAL NUMERIC MONEY FLOAT NVARCHAR VARCHAR NCHAR CHAR DATE
  DATETIME DATETIME2 TIME BIT IDENTITY`);
const GRAY = words('AND OR NOT IS NULL IN LIKE BETWEEN EXISTS ALL ANY SOME JOIN INNER LEFT RIGHT FULL OUTER CROSS APPLY');
const FUNCTIONS = words(`GETDATE SYSDATETIME DATEDIFF DATEADD EOMONTH DATEPART DATENAME YEAR MONTH DAY FORMAT ISNULL
  COALESCE NULLIF CAST CONVERT COUNT SUM AVG MIN MAX LEN SUBSTRING CONCAT TRIM LTRIM RTRIM UPPER LOWER REPLACE ROUND
  ROW_NUMBER RANK DENSE_RANK LAG LEAD STRING_AGG IIF @@ROWCOUNT @@TRANCOUNT @@ERROR`);

export function highlightTsql(code: string): { text: string; kind: TokenKind }[] {
  const tokens = lexTsql(code);
  return tokens.map((t, i) => {
    const upper = t.text.toUpperCase();
    switch (t.type) {
      case 'string': return { text: t.text, kind: 'string' };
      case 'comment': return { text: t.text, kind: 'comment' };
      case 'variable': return { text: t.text, kind: FUNCTIONS.has(upper) ? 'function' : 'plain' };
      case 'symbol': return { text: t.text, kind: t.text === '.' ? 'plain' : 'gray' };
      case 'word': {
        if ((upper === 'LEFT' || upper === 'RIGHT') && tokens.slice(i + 1).find(n => n.type !== 'space')?.text === '(') {
          return { text: t.text, kind: 'function' };
        }
        if (BLUE.has(upper)) return { text: t.text, kind: 'keyword' };
        if (GRAY.has(upper)) return { text: t.text, kind: 'gray' };
        if (FUNCTIONS.has(upper)) return { text: t.text, kind: 'function' };
        return { text: t.text, kind: 'plain' };
      }
      default: return { text: t.text, kind: 'plain' };
    }
  });
}
