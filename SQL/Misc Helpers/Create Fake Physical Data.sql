-- SELECT TOP (1000) [PhysicalID]
--       ,[UserID]
--       ,[Date]
--       ,[PainLevel]
--       ,[Headache]
--       ,[Nausea]
--       ,[StomachAche]
--       ,[SoreThroat]
--       ,[Cough]
--       ,[Congestion]
--       ,[NightSweats]
--       ,[BackPain]
--       ,[JawPain]
--       ,[KneePain]
--       ,[NoseBleed]
--       ,[PeriodCramps]
--       ,[Hangover]
--       ,[MuscleSoreness]
--   FROM [BulletJournalApp].[app].[physical]


DECLARE @startDate date = dateadd(day, -214, getdate())
DECLARE @CutoffDate date = DATEADD(DAY, 0, getdate());
-- select @startDate
-- select @CutoffDate
  ;WITH seq(n) AS 
(
  SELECT 0 UNION ALL SELECT n + 1 FROM seq
  WHERE n < DATEDIFF(DAY, @StartDate, @CutoffDate)
)
insert into app.physical
SELECT 2 as [UserID] 
    ,dateadd(day, n, @startDate) as Date
      ,CAST(ABS(CHECKSUM(NEWID())) % (1-0) AS INT) AS [PainLevel]
      ,CAST((ABS(CHECKSUM(NEWID())) % (1.05-0)) AS INT) AS [Headache]
      ,CAST((ABS(CHECKSUM(NEWID())) % (1.05-0)) AS INT) AS [Nausea]
      ,CAST((ABS(CHECKSUM(NEWID())) % (1.05-0)) AS INT) AS [StomachAche]
      ,CAST((ABS(CHECKSUM(NEWID())) % (1.0-0)) AS INT) AS [SoreThroat]
      ,CAST((ABS(CHECKSUM(NEWID())) % (1.0-0)) AS INT) AS [Cough]
      ,CAST((ABS(CHECKSUM(NEWID())) % (1.0-0)) AS INT) AS [Congestion]
      ,CAST((ABS(CHECKSUM(NEWID())) % (1.05-0)) AS INT) AS [NightSweats]
      ,CAST((ABS(CHECKSUM(NEWID())) % (1.05-0)) AS INT) AS [BackPain]
      ,CAST((ABS(CHECKSUM(NEWID())) % (1.05-0)) AS INT) AS [JawPain]
      ,CAST((ABS(CHECKSUM(NEWID())) % (1.05-0)) AS INT) AS [KneePain]
      ,CAST((ABS(CHECKSUM(NEWID())) % (1.05-0)) AS INT) AS [NoseBleed]
      ,CAST((ABS(CHECKSUM(NEWID())) % (1.0-0)) AS INT) AS [PeriodCramps]
      ,CAST((ABS(CHECKSUM(NEWID())) % (1.05-0)) AS INT) AS [Hangover]
      ,CAST((ABS(CHECKSUM(NEWID())) % (1.05-0)) AS INT) AS [MuscleSoreness]
FROM seq
where dateadd(day, n, @startDate) not in (select date from app.physical)
OPTION (MAXRECURSION 0);