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
-- insert into app.morning
SELECT 2 as [UserID] 
    ,dateadd(day, n, @startDate) as Date
      ,CAST(ABS(CHECKSUM(NEWID())) % (2-0) AS INT) AS [Breakfast]
      ,CAST((ABS(CHECKSUM(NEWID())) % (2-0.5) + 0.75) AS INT) AS [Lunch]
      ,CAST((ABS(CHECKSUM(NEWID())) % (2-1.25) + 0.25) AS INT) AS [Dinner]
      ,CAST((ABS(CHECKSUM(NEWID())) % (1.75-0) - 0.5) AS INT) AS [Fruits]
      ,CAST(ABS(CHECKSUM(NEWID())) % (2-0) AS INT) AS [Vegetables]
      ,CAST((ABS(CHECKSUM(NEWID())) % (2-0.5) + 0.75) AS INT) AS [Read]
      ,CAST((ABS(CHECKSUM(NEWID())) % (2-1.5) + 0.25) AS INT) AS [WentOutside]
      ,CAST((ABS(CHECKSUM(NEWID())) % (1.75-0)) AS INT) AS [Showered]
      ,CAST(ABS(CHECKSUM(NEWID())) % (2-0) AS INT) AS [Journaled]
      ,CAST((ABS(CHECKSUM(NEWID())) % (2-0.5) + 0.25) AS INT) AS [Meditated]
      ,CAST((ABS(CHECKSUM(NEWID())) % (2-0.75) + 0.5) AS INT) AS [CheckEmails]
      ,CAST((ABS(CHECKSUM(NEWID())) % (2-1.25)) AS INT) AS [CheckTexts]
      ,CAST((ABS(CHECKSUM(NEWID())) % (2-1.25)) AS INT) AS [CommitmentsMet]
      ,CAST(ABS(CHECKSUM(NEWID())) % (15000-1000) AS INT) + 1000 AS [Steps]
      ,CAST(ABS(CHECKSUM(NEWID())) % (200-0) AS INT) AS [Spending]
      ,CAST(ABS(CHECKSUM(NEWID())) % (8-4) AS INT) + 4 AS [ScreenTime]
      ,CASE WHEN DATEPART(DW, dateadd(day, n, @startDate)) in (1, 7) THEN 0
        ELSE CAST(ABS(CHECKSUM(NEWID())) % (9-7) AS INT) + 7 END AS [HoursWorked]
FROM seq
where dateadd(day, n, @startDate) not in (select date from app.daily)
OPTION (MAXRECURSION 0);