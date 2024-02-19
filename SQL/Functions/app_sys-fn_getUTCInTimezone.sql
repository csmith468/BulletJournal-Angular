SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [app_sys].[fn_getUTCInTimezone](
    @UTCDatetime datetime,
    @TimezoneID int
)
RETURNS DATETIME
AS 
BEGIN

    -- standard and transition biases
    DECLARE @Year int = (SELECT DATEPART(yy, @UTCDatetime));
    DECLARE @TimezoneBiasID int = (SELECT TimezoneBiasID FROM app_sys.timezone WHERE TimezoneID = @TimezoneID);
    DECLARE @StandardBias int = (SELECT StandardBias FROM app_sys.timezone WHERE TimezoneID = @TimezoneID);
    DECLARE @TransitionBias int = (SELECT TransitionBias FROM app_sys.timezoneBias WHERE TimezoneBiasID = @TimezoneBiasID);

    -- parts of date for normal section of daylight savings
    DECLARE @NormalDayOfWeek int = (SELECT TOP(1) NormalDayOfWeek FROM app_sys.timezoneBias WHERE TimezoneBiasID = @TimezoneBiasID);
    DECLARE @NormalDayOfWeekOccurrence int = (SELECT TOP(1) NormalDayOfWeekOccurrence FROM app_sys.timezoneBias WHERE TimezoneBiasID = @TimezoneBiasID);
    DECLARE @NormalMonth int = (SELECT TOP(1) NormalMonth FROM app_sys.timezoneBias WHERE TimezoneBiasID = @TimezoneBiasID);
    DECLARE @NormalTimeOfDay time = (SELECT TOP(1) NormalTimeOfDay FROM app_sys.timezoneBias WHERE TimezoneBiasID = @TimezoneBiasID);

    -- parts of date for transition section of daylight savings
    DECLARE @TransitionDayOfWeek int = (SELECT TOP(1) TransitionDayOfWeek FROM app_sys.timezoneBias WHERE TimezoneBiasID = @TimezoneBiasID);
    DECLARE @TransitionDayOfWeekOccurrence int = (SELECT TOP(1) TransitionDayOfWeekOccurrence FROM app_sys.timezoneBias WHERE TimezoneBiasID = @TimezoneBiasID);
    DECLARE @TransitionMonth int = (SELECT TOP(1) TransitionMonth FROM app_sys.timezoneBias WHERE TimezoneBiasID = @TimezoneBiasID);
    DECLARE @TransitionTimeOfDay time = (SELECT TOP(1) TransitionTimeOfDay FROM app_sys.timezoneBias WHERE TimezoneBiasID = @TimezoneBiasID);

    -- get UTC datetime in current timezone
    DECLARE @DatetimeInTimezone datetime = (SELECT DATEADD(minute, @StandardBias, @UTCDatetime));

    -- get start and end dates of daylight savings
    DECLARE @SubtractDatetime datetime;
    DECLARE @AddDatetime datetime;

    -- temp tables to hold all dates in month to calculate above 2 values
    DECLARE @DatesNormal table (Date date);
    DECLARE @DatesTransition table (Date date);
    
    -- get start of when daylight savings moves time backwards
    WITH Dates AS (
        SELECT DATEFROMPARTS(@Year, @NormalMonth, 1) AS Date
        UNION ALL
        SELECT DATEADD(day, 1, Date)
        FROM Dates
        WHERE MONTH(DATEADD(day, 1, Date)) = @NormalMonth
    )
    INSERT INTO @DatesNormal SELECT Date FROM Dates;

    SET @SubtractDatetime = (
        SELECT TOP (1) CAST(Date AS datetime) + CAST(@NormalTimeOfDay AS datetime) AS [SubtractDatetime]
        FROM (
            SELECT Date, ROW_NUMBER() OVER (ORDER BY Date) AS RowNumber
            FROM @DatesNormal
            WHERE datepart(dw, Date) = (@NormalDayOfWeek + 1)
        ) AS Mondays
        WHERE RowNumber = @NormalDayOfWeekOccurrence
    );

    -- get start of when daylight savings moves time forwards
    WITH Dates AS (
        SELECT DATEFROMPARTS(@Year, @TransitionMonth, 1) AS Date
        UNION ALL
        SELECT DATEADD(day, 1, Date)
        FROM Dates
        WHERE MONTH(DATEADD(day, 1, Date)) = @TransitionMonth
    )
    INSERT INTO @DatesTransition SELECT Date from Dates;

    SET @AddDatetime = (
        SELECT CAST(Date AS datetime) + CAST(@TransitionTimeOfDay AS datetime) AS [AddDatetime]
        FROM (
            SELECT Date, ROW_NUMBER() OVER (ORDER BY Date) AS RowNumber
            FROM @DatesTransition
            WHERE datepart(dw, Date) = (@TransitionDayOfWeek + 1)
        ) AS Mondays
        WHERE RowNumber = @TransitionDayOfWeekOccurrence
    );

    -- if within daylight savings fall back, add that transition bias (usually -60) to datetime
    RETURN CASE 
        WHEN @TimezoneBiasID IS NULL THEN @DatetimeInTimezone
        WHEN @DatetimeInTimezone BETWEEN @AddDatetime AND @SubtractDatetime THEN @DatetimeInTimezone
        ELSE DATEADD(minute, @TransitionBias, @DatetimeInTimezone) END

END

GO
