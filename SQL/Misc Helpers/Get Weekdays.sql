DECLARE @StartDate date = '20240121', 
        @EndDate   date = '20240127';

;WITH Months(TheMonth) AS 
(
  SELECT DATEFROMPARTS(YEAR(@StartDate), MONTH(@StartDate), day(@StartDate))
  UNION ALL
  SELECT DATEADD(day, 1, TheMonth) 
    FROM Months
    WHERE TheMonth < DATEFROMPARTS(YEAR((@EndDate)), MONTH(@EndDate), day(@EndDate))
)
insert into dbo.weekday
SELECT DATENAME(WEEKDAY, TheMonth) as WeekdayName, DATEPART(WEEKDAY, TheMonth) as WeekdayNumber
FROM Months AS m
OPTION (MAXRECURSION 0);
