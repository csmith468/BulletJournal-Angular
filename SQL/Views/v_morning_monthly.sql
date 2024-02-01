SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER VIEW [app].[v_morning_monthly] AS
  SELECT 
    [morning].[UserID],
    [month].[Name],
    [month].[Number],
    [month].[Year],
    [month].[Label],
    [month].[StartDate],
    [month].[EndDate],
    SUM(CASE WHEN [GlassOfWater] = 1 THEN 1.0 ELSE 0.0 END)/COUNT(CASE WHEN [GlassOfWater] IS NOT NULL THEN 1 ELSE 0 END) AS [GlassOfWater],
    SUM(CASE WHEN [Meds] = 1 THEN 1.0 ELSE 0.0 END)/COUNT(CASE WHEN [Meds] IS NOT NULL THEN 1 ELSE 0 END) AS [Meds],
    SUM(CASE WHEN [Vitamins] = 1 THEN 1.0 ELSE 0.0 END)/COUNT(CASE WHEN [Vitamins] IS NOT NULL THEN 1 ELSE 0 END) AS [Vitamins],
    SUM(CASE WHEN [Breakfast] = 1 THEN 1.0 ELSE 0.0 END)/COUNT(CASE WHEN [Breakfast] IS NOT NULL THEN 1 ELSE 0 END) AS [Breakfast]
  FROM dbo.[month]
  LEFT JOIN app.[morning] on DATEPART(MONTH, [morning].[Date]) = [month].[Number] and DATEPART(YEAR, [morning].[Date]) = [month].[Year]
  GROUP BY 
    [morning].[UserID],
    [month].[Name],
    [month].[Number],
    [month].[Year],
    [month].[Label],
    [month].[StartDate],
    [month].[EndDate]
GO
