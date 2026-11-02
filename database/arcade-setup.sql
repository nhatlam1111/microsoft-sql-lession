-- Storage and users of SQL Arcade (spec 2026-11-03-sql-arcade-mvp-design, section 9).
-- Run once in the Query editor of the arcade database, signed in with the admin account.
-- Replace both <điền mật khẩu…> with strong passwords of your own choosing, then put the same passwords
-- in ARCADE_RUNNER_PASSWORD and ARCADE_STORE_PASSWORD. Do not save the passwords in this file.
-- The dbo schema stays empty: every test creates its tables inside a transaction that is rolled back.

-- CREATE SCHEMA must open its batch; EXEC gives it one, so the script needs no GO and runs in any query tool.
EXEC (N'CREATE SCHEMA arcade');

CREATE TABLE arcade.Learner (
    LearnerId char(64)     NOT NULL PRIMARY KEY,
    Coins     int          NOT NULL CONSTRAINT CK_Learner_Coins CHECK (Coins >= 0),
    CreatedAt datetime2(0) NOT NULL DEFAULT SYSUTCDATETIME()
);

CREATE TABLE arcade.Completion (
    LearnerId   char(64)      NOT NULL REFERENCES arcade.Learner (LearnerId),
    ChallengeId varchar(100)  NOT NULL,
    Reward      int           NOT NULL,
    Sql         nvarchar(max) NOT NULL,
    CompletedAt datetime2(0)  NOT NULL DEFAULT SYSUTCDATETIME(),
    PRIMARY KEY (LearnerId, ChallengeId)
);

CREATE TABLE arcade.OpenedTest (
    LearnerId   char(64)     NOT NULL REFERENCES arcade.Learner (LearnerId),
    ChallengeId varchar(100) NOT NULL,
    TestId      int          NOT NULL,
    Cost        int          NOT NULL,
    OpenedAt    datetime2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    PRIMARY KEY (LearnerId, ChallengeId, TestId)
);

CREATE TABLE arcade.Submission (
    Id          bigint IDENTITY PRIMARY KEY,
    LearnerId   char(64)      NOT NULL REFERENCES arcade.Learner (LearnerId),
    ChallengeId varchar(100)  NOT NULL,
    Sql         nvarchar(max) NOT NULL,
    Passed      int           NOT NULL,
    Total       int           NOT NULL,
    Accepted    bit           NOT NULL,
    FailedTests varchar(100)  NOT NULL,
    SubmittedAt datetime2(0)  NOT NULL DEFAULT SYSUTCDATETIME()
);
CREATE INDEX IX_Submission_Last ON arcade.Submission (LearnerId, ChallengeId, Id DESC);

-- Runs the learner's statement: may build test tables in dbo, cannot touch the arcade schema.
CREATE USER arcade_runner WITH PASSWORD = N'<điền mật khẩu>';
GRANT CREATE TABLE TO arcade_runner;
GRANT ALTER, SELECT, INSERT ON SCHEMA::dbo TO arcade_runner;

-- Saves progress and coins: only the arcade schema.
CREATE USER arcade_store WITH PASSWORD = N'<điền mật khẩu khác>';
GRANT SELECT, INSERT, UPDATE ON SCHEMA::arcade TO arcade_store;
