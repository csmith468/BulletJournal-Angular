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
insert into app.physical ([UserID], Date, [Question1], [Question2], [Question3], [Question4]
    , [Question5], [Question6], [Question7], [Question8], [Question9], [Question10], [Question11]
    , [Question12], [Question13], [Question14], [Question15])
SELECT 2 as [UserID] 
    ,dateadd(day, n, @startDate) as Date
      ,CAST(ABS(CHECKSUM(NEWID())) % (1-0) AS INT) AS [Question1]
      ,CAST((ABS(CHECKSUM(NEWID())) % (1.05-0)) AS INT) AS [Question2]
      ,CAST((ABS(CHECKSUM(NEWID())) % (1.05-0)) AS INT) AS [Question3]
      ,CAST((ABS(CHECKSUM(NEWID())) % (1.05-0)) AS INT) AS [Question4]
      ,CAST((ABS(CHECKSUM(NEWID())) % (1.0-0)) AS INT) AS [Question5]
      ,CAST((ABS(CHECKSUM(NEWID())) % (1.0-0)) AS INT) AS [Question6]
      ,CAST((ABS(CHECKSUM(NEWID())) % (1.0-0)) AS INT) AS [Question7]
      ,CAST((ABS(CHECKSUM(NEWID())) % (1.05-0)) AS INT) AS [Question8]
      ,CAST((ABS(CHECKSUM(NEWID())) % (1.05-0)) AS INT) AS [Question9]
      ,CAST((ABS(CHECKSUM(NEWID())) % (1.05-0)) AS INT) AS [Question10]
      ,CAST((ABS(CHECKSUM(NEWID())) % (1.05-0)) AS INT) AS [Question11]
      ,CAST((ABS(CHECKSUM(NEWID())) % (1.05-0)) AS INT) AS [Question12]
      ,CAST((ABS(CHECKSUM(NEWID())) % (1.0-0)) AS INT) AS [Question13]
      ,CAST((ABS(CHECKSUM(NEWID())) % (1.05-0)) AS INT) AS [Question14]
      ,CAST((ABS(CHECKSUM(NEWID())) % (1.05-0)) AS INT) AS [Question15]
FROM seq
where dateadd(day, n, @startDate) not in (select date from app.physical)
OPTION (MAXRECURSION 0);
