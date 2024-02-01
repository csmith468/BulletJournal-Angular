-- SELECT TOP (1000) [MorningID]
--       ,[UserID]
--       ,[Date]
--       ,[GlassOfWater]
--       ,[Meds]
--       ,[Vitamins]
--       ,[Breakfast]
--   FROM [BulletJournalApp].[app].[morning]


DECLARE @startDate date = dateadd(day, -214, getdate())
DECLARE @CutoffDate date = DATEADD(DAY, 0, getdate());
-- select @startDate
-- select @CutoffDate
  ;WITH seq(n) AS 
(
  SELECT 0 UNION ALL SELECT n + 1 FROM seq
  WHERE n < DATEDIFF(DAY, @StartDate, @CutoffDate)
)
insert into app.morning
SELECT 2 as [UserID] 
    ,dateadd(day, n, @startDate) as Date
      ,CAST(ABS(CHECKSUM(NEWID())) % (2-0) AS INT) AS [GlassOfWater]
      ,CAST((ABS(CHECKSUM(NEWID())) % (2-0.5) + 0.75) AS INT) AS [Meds]
      ,CAST((ABS(CHECKSUM(NEWID())) % (2-0.75) + 0.5) AS INT) AS [Vitamins]
      ,CAST((ABS(CHECKSUM(NEWID())) % (1.75-0) - 0.5) AS INT) AS [Breakfast]
FROM seq
where dateadd(day, n, @startDate) not in (select date from app.morning)
OPTION (MAXRECURSION 0);