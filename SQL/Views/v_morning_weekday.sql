SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [app].[v_morning_weekday] AS
  SELECT 
    [morning].[UserID],
    [weekday].[WeekdayName],
    [weekday].[WeekdayNumber],
    SUM(CASE WHEN [GlassOfWater] = 1 THEN 1.0 ELSE 0.0 END)/COUNT(CASE WHEN [GlassOfWater] IS NOT NULL THEN 1 ELSE 0 END) AS [GlassOfWater],
    SUM(CASE WHEN [Meds] = 1 THEN 1.0 ELSE 0.0 END)/COUNT(CASE WHEN [Meds] IS NOT NULL THEN 1 ELSE 0 END) AS [Meds],
    SUM(CASE WHEN [Vitamins] = 1 THEN 1.0 ELSE 0.0 END)/COUNT(CASE WHEN [Vitamins] IS NOT NULL THEN 1 ELSE 0 END) AS [Vitamins],
    SUM(CASE WHEN [Breakfast] = 1 THEN 1.0 ELSE 0.0 END)/COUNT(CASE WHEN [Breakfast] IS NOT NULL THEN 1 ELSE 0 END) AS [Breakfast]
  FROM dbo.[weekday]
  LEFT JOIN app.[morning] on DATEPART(WEEKDAY, [morning].[Date]) = [weekday].[WeekdayNumber]
  GROUP BY 
    [morning].[UserID],
    [weekday].[WeekdayName],
    [weekday].[WeekdayNumber]
GO
