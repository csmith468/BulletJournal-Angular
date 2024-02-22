DECLARE @startDate date = dateadd(day, -214, getdate())
DECLARE @CutoffDate date = DATEADD(DAY, 0, getdate());
-- select @startDate
-- select @CutoffDate
  ;WITH seq(n) AS 
(
  SELECT 0 UNION ALL SELECT n + 1 FROM seq
  WHERE n < DATEDIFF(DAY, @StartDate, @CutoffDate)
)
insert into app.example ([UserID], Date, [Question1], [Question2], [Question3], [Question4]
    , [Question5], [Question6], [Question7], [Question8], [Question9], [Question10], [Question11]
    , [Question12], [Question13], [Question14], [Question15], [Question16], [Question17])
SELECT 2 as [UserID] 
    ,dateadd(day, n, @startDate) as Date
      ,CAST(ABS(CHECKSUM(NEWID())) % (2-0) AS INT) AS [YesNo1] -- 0 or 1
      ,CAST((ABS(CHECKSUM(NEWID())) % (2-0.5) + 0.75) AS INT) AS [YesNo2]   -- biased toward 1
      ,CAST((ABS(CHECKSUM(NEWID())) % (2-1.25) + 0.25) AS INT) AS [YesNo3]  -- biased toward 0
      ,CAST((ABS(CHECKSUM(NEWID())) % (1.75-0) - 0.5) AS INT) AS [YesNo4]   -- very biased toward 0
      ,CAST(ABS(CHECKSUM(NEWID())) % (15000-1000) AS INT) + 1000 AS [LargeNumber5]  -- between 1,000 - 15,000
      ,CAST(ABS(CHECKSUM(NEWID())) % (200-0) AS INT) AS [SmallNumber6]  -- between 0-200
      ,CAST(ABS(CHECKSUM(NEWID())) % (8-4) AS INT) + 4 AS [Range7] -- between 4-8 (hrs)
      ,CAST(ABS(CHECKSUM(NEWID())) % (7-1) AS INT) + 1 AS [Range8] -- between 1-7
      ,CAST(ABS(CHECKSUM(NEWID())) % (5-0) AS INT) + 0 AS [Range9] -- bewteen 0-5
      ,CASE WHEN DATEPART(DW, dateadd(day, n, @startDate)) in (1, 7) THEN 0
        ELSE CAST(ABS(CHECKSUM(NEWID())) % (9-7) AS INT) + 7 END AS [Question17]
FROM seq
where dateadd(day, n, @startDate) not in (select date from app.example)
OPTION (MAXRECURSION 0);