DECLARE @StartDate date = '20100101', 
        @EndDate   date = '20401231';

;WITH Months(TheMonth) AS 
(
  SELECT DATEFROMPARTS(YEAR(@StartDate), MONTH(@StartDate), 1)
  UNION ALL
  SELECT DATEADD(week, 1, TheMonth) 
    FROM Months
    WHERE TheMonth < DATEFROMPARTS(YEAR((@EndDate)), MONTH(@EndDate), 1)
)
insert into dbo.week
SELECT DATEPART(week, TheMonth) as WeekNumber, DATEPART(year, TheMonth) as Year, 
concat(DATENAME(week, TheMonth), '-', cast(DATEPART(year, TheMonth) as nvarchar(10))) as WeekYear
FROM Months AS m
OPTION (MAXRECURSION 0);
