DECLARE @startDate date = dateadd(day, -214, getdate())
DECLARE @CutoffDate date = DATEADD(DAY, 0, getdate());
-- select @startDate
-- select @CutoffDate
  ;WITH seq(n) AS 
(
  SELECT 0 UNION ALL SELECT n + 1 FROM seq
  WHERE n < DATEDIFF(DAY, @StartDate, @CutoffDate)
)
insert into app.daily ([UserID], Date, [Question1], [Question2], [Question3], [Question4]
    , [Question5], [Question6], [Question7], [Question8], [Question9], [Question10], [Question11]
    , [Question12], [Question13], [Question14], [Question15], [Question16], [Question17])
SELECT 2 as [UserID] 
    ,dateadd(day, n, @startDate) as Date
      ,CAST(ABS(CHECKSUM(NEWID())) % (2-0) AS INT) AS [Question1]
      ,CAST((ABS(CHECKSUM(NEWID())) % (2-0.5) + 0.75) AS INT) AS [Question2]
      ,CAST((ABS(CHECKSUM(NEWID())) % (2-1.25) + 0.25) AS INT) AS [Question3]
      ,CAST((ABS(CHECKSUM(NEWID())) % (1.75-0) - 0.5) AS INT) AS [Question4]
      ,CAST(ABS(CHECKSUM(NEWID())) % (2-0) AS INT) AS [Question5]
      ,CAST((ABS(CHECKSUM(NEWID())) % (2-0.5) + 0.75) AS INT) AS [Question6]
      ,CAST((ABS(CHECKSUM(NEWID())) % (2-1.5) + 0.25) AS INT) AS [Question7]
      ,CAST((ABS(CHECKSUM(NEWID())) % (1.75-0)) AS INT) AS [Question8]
      ,CAST(ABS(CHECKSUM(NEWID())) % (2-0) AS INT) AS [Question9]
      ,CAST((ABS(CHECKSUM(NEWID())) % (2-0.5) + 0.25) AS INT) AS [Question10]
      ,CAST((ABS(CHECKSUM(NEWID())) % (2-0.75) + 0.5) AS INT) AS [Question11]
      ,CAST((ABS(CHECKSUM(NEWID())) % (2-1.25)) AS INT) AS [Question12]
      ,CAST((ABS(CHECKSUM(NEWID())) % (2-1.25)) AS INT) AS [Question13]
      ,CAST(ABS(CHECKSUM(NEWID())) % (15000-1000) AS INT) + 1000 AS [Question14]
      ,CAST(ABS(CHECKSUM(NEWID())) % (200-0) AS INT) AS [Question15]
      ,CAST(ABS(CHECKSUM(NEWID())) % (8-4) AS INT) + 4 AS [Question16]
      ,CASE WHEN DATEPART(DW, dateadd(day, n, @startDate)) in (1, 7) THEN 0
        ELSE CAST(ABS(CHECKSUM(NEWID())) % (9-7) AS INT) + 7 END AS [Question17]
FROM seq
where dateadd(day, n, @startDate) not in (select date from app.daily)
OPTION (MAXRECURSION 0);