-- User for the exercise API (spec B, section 5.4).
-- Run once in the Query editor of the sql-lession database, signed in with the admin account.
-- Replace <điền mật khẩu> with a strong password of your own choosing, then put the same password
-- in the Function App setting SQL_PASSWORD. Do not save the password in this file.

CREATE USER hrm_practice WITH PASSWORD = N'<điền mật khẩu>';

GRANT SELECT, INSERT, UPDATE, DELETE ON dbo.PhongBan    TO hrm_practice;
GRANT SELECT, INSERT, UPDATE, DELETE ON dbo.ChucDanh    TO hrm_practice;
GRANT SELECT, INSERT, UPDATE, DELETE ON dbo.NhanVien    TO hrm_practice;
GRANT SELECT, INSERT, UPDATE, DELETE ON dbo.HopDong     TO hrm_practice;
GRANT SELECT, INSERT, UPDATE, DELETE ON dbo.ChamCong    TO hrm_practice;
GRANT SELECT, INSERT, UPDATE, DELETE ON dbo.DonNghiPhep TO hrm_practice;
GRANT SELECT, INSERT, UPDATE, DELETE ON dbo.BangLuong   TO hrm_practice;
