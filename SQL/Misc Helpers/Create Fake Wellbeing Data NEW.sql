DECLARE @startDate date = dateadd(day, -214, getdate())
DECLARE @CutoffDate date = DATEADD(DAY, 0, getdate());
select @startDate
select @CutoffDate

;WITH seq(n) AS 
(
  SELECT 0 UNION ALL SELECT n + 1 FROM seq
  WHERE n < DATEDIFF(DAY, @StartDate, @CutoffDate)
)
insert into app.wellbeing ([UserID], Date, [Question1], [Question2], [Question3], [Question4]
    , [Question5], [Question6], [Question7], [Question8], [Question9])
SELECT 2 as [UserID] 
    ,dateadd(day, n, @startDate) as Date
      ,CAST(ABS(CHECKSUM(NEWID())) % (9-4) AS INT) + 4 AS [Question1]
      ,CAST(ABS(CHECKSUM(NEWID())) % (9-5) AS INT) + 5 AS [Question2]
      ,CAST(ABS(CHECKSUM(NEWID())) % (7-1) AS INT) + 1 AS [Question3]
      ,CAST(ABS(CHECKSUM(NEWID())) % (5-0) AS INT) + 0 AS [Question4]
      ,CAST(ABS(CHECKSUM(NEWID())) % (4-0) AS INT) + 0 AS [Question5]
      ,CAST(ABS(CHECKSUM(NEWID())) % (8-2) AS INT) + 2 AS [Question6]
      ,CAST(ABS(CHECKSUM(NEWID())) % (8-2) AS INT) + 2 AS [Question7]
      ,CAST(ABS(CHECKSUM(NEWID())) % (6-0) AS INT) + 0 AS [Question8]
      ,CAST(ABS(CHECKSUM(NEWID())) % (8-3) AS INT) + 3 AS [Question9]
FROM seq
where dateadd(day, n, @startDate) not in (select date from app.wellbeing)
OPTION (MAXRECURSION 0);
