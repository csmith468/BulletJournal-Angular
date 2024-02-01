SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER VIEW [app].[v_morning_weekly] AS
  SELECT 
    [morning].[UserID],
    [week].[Name],
    [week].[Number],
    [week].[Year],
    [week].[Label],
    [week].[StartDate],
    [week].[EndDate],
    SUM(CASE WHEN [GlassOfWater] = 1 THEN 1.0 ELSE 0.0 END)/COUNT(CASE WHEN [GlassOfWater] IS NOT NULL THEN 1 ELSE 0 END) AS [GlassOfWater],
    SUM(CASE WHEN [Meds] = 1 THEN 1.0 ELSE 0.0 END)/COUNT(CASE WHEN [Meds] IS NOT NULL THEN 1 ELSE 0 END) AS [Meds],
    SUM(CASE WHEN [Vitamins] = 1 THEN 1.0 ELSE 0.0 END)/COUNT(CASE WHEN [Vitamins] IS NOT NULL THEN 1 ELSE 0 END) AS [Vitamins],
    SUM(CASE WHEN [Breakfast] = 1 THEN 1.0 ELSE 0.0 END)/COUNT(CASE WHEN [Breakfast] IS NOT NULL THEN 1 ELSE 0 END) AS [Breakfast]
  FROM dbo.[week]
  LEFT JOIN app.[morning] on DATEPART(WEEK, [morning].[Date]) = [week].[Number] and DATEPART(YEAR, [morning].[Date]) = [week].[Year]
  GROUP BY 
    [morning].[UserID],
    [week].[Name],
    [week].[Number],
    [week].[Year],
    [week].[Label],
    [week].[StartDate],
    [week].[EndDate]
GO
