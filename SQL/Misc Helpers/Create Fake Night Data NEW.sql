DECLARE @startDate date = dateadd(day, -214, getdate())
DECLARE @CutoffDate date = DATEADD(DAY, 0, getdate());
-- select @startDate
-- select @CutoffDate
  ;WITH seq(n) AS 
(
  SELECT 0 UNION ALL SELECT n + 1 FROM seq
  WHERE n < DATEDIFF(DAY, @StartDate, @CutoffDate)
)
insert into app.night ([UserID], Date, [Question1], [Question2], [Question3], [Question4]
    , [Question5], [Question6])
SELECT 2 as [UserID] 
    ,dateadd(day, n, @startDate) as Date
      ,CAST(ABS(CHECKSUM(NEWID())) % (2-0) AS INT) AS [Question1]
      ,CAST((ABS(CHECKSUM(NEWID())) % (2-0.5) + 0.75) AS INT) AS [Question2]
      ,CAST((ABS(CHECKSUM(NEWID())) % (2-1.25) + 0.25) AS INT) AS [Question3]
      ,CAST((ABS(CHECKSUM(NEWID())) % (1.75-0) - 0.5) AS INT) AS [Question4]
      ,CAST(ABS(CHECKSUM(NEWID())) % (2-0) AS INT) AS [Question5]
      ,CAST((ABS(CHECKSUM(NEWID())) % (2-0.5) + 0.75) AS INT) AS [Question6]
FROM seq
where dateadd(day, n, @startDate) not in (select date from app.night)
OPTION (MAXRECURSION 0);