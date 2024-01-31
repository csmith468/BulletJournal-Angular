SELECT TOP (1000) [WellbeingID]
      ,[UserID]
      ,[Date]
      ,[DayRating]
      ,[Happiness]
      ,[Sadness]
      ,[Shame]
      ,[Anger]
      ,[Anxiety]
      ,[Overwhelmed]
      ,[Irritable]
      ,[Energy]
  FROM [BulletJournalApp].[app].[wellbeing]

DECLARE @startDate date = dateadd(day, -214, getdate())
DECLARE @CutoffDate date = DATEADD(DAY, -115, getdate());
select @startDate
select @CutoffDate

;WITH seq(n) AS 
(
  SELECT 0 UNION ALL SELECT n + 1 FROM seq
  WHERE n < DATEDIFF(DAY, @StartDate, @CutoffDate)
)
insert into app.wellbeing
SELECT 2 as [UserID] 
    ,dateadd(day, n, @startDate) as Date
      ,CAST(ABS(CHECKSUM(NEWID())) % (9-4) AS INT) + 4 AS [DayRating]
      ,CAST(ABS(CHECKSUM(NEWID())) % (9-5) AS INT) + 5 AS [Happiness]
      ,CAST(ABS(CHECKSUM(NEWID())) % (7-1) AS INT) + 1 AS [Sadness]
      ,CAST(ABS(CHECKSUM(NEWID())) % (5-0) AS INT) + 0 AS [Shame]
      ,CAST(ABS(CHECKSUM(NEWID())) % (4-0) AS INT) + 0 AS [Anger]
      ,CAST(ABS(CHECKSUM(NEWID())) % (8-2) AS INT) + 2 AS [Anxiety]
      ,CAST(ABS(CHECKSUM(NEWID())) % (8-2) AS INT) + 2 AS [Overwhelmed]
      ,CAST(ABS(CHECKSUM(NEWID())) % (6-0) AS INT) + 0 AS [Irritable]
      ,CAST(ABS(CHECKSUM(NEWID())) % (8-3) AS INT) + 3 AS [Energy]
FROM seq
