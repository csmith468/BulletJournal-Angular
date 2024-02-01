DECLARE @StartDate date = '20100101', 
        @EndDate   date = '20401231';

;WITH Months(TheMonth, endDate) AS 
( 
  SELECT DATEFROMPARTS(YEAR(@StartDate), MONTH(@StartDate), day(@StartDate)), cast('2010-01-31' as date)
  UNION ALL
  SELECT DATEADD(month, 1, TheMonth), dateadd(day, -1, dateadd(month, 2, TheMonth))
    FROM Months
    WHERE TheMonth < DATEFROMPARTS(YEAR((@EndDate)), MONTH(@EndDate), day(@EndDate))
)
insert into dbo.month
SELECT DATEPART(month, TheMonth) as Number, 
DATENAME(month, TheMonth) as Name, 
DATEPART(year, TheMonth) as Year, 
concat(DATENAME(month, TheMonth), ' ', cast(DATEPART(year, TheMonth) as nvarchar(10))) as Label,
TheMonth as StartDate, 
EndDate
FROM Months AS m
OPTION (MAXRECURSION 0);
