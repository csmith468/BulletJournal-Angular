SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [app_sys].[v_completedToday] AS 
    SELECT
        [user].[UserID],
        CAST([app_sys].GetUTCInUserTimezone(GETUTCDATE(), [user].[UserID]) AS Date) AS [Date],
        CASE WHEN [daily].[UserID] IS NOT NULL THEN 1 ELSE 0 END AS [daily],
        CASE WHEN [morning].[UserID] IS NOT NULL THEN 1 ELSE 0 END AS [morning],
        CASE WHEN [night].[UserID] IS NOT NULL THEN 1 ELSE 0 END AS [night],
        CASE WHEN [physical].[UserID] IS NOT NULL THEN 1 ELSE 0 END AS [physical],
        -- CASE WHEN [sleep].[UserID] IS NOT NULL THEN 1 ELSE 0 END AS [sleep],
        CASE WHEN [spendingFinancial].[UserID] IS NOT NULL THEN 1 ELSE 0 END AS [spendingFinancial],
        CASE WHEN [spendingHealthcare].[UserID] IS NOT NULL THEN 1 ELSE 0 END AS [spendingHealthcare],
        CASE WHEN [spendingPersonal].[UserID] IS NOT NULL THEN 1 ELSE 0 END AS [spendingPersonal],
        CASE WHEN [spendingRegular].[UserID] IS NOT NULL THEN 1 ELSE 0 END AS [spendingRegular],
        CASE WHEN [wellbeing].[UserID] IS NOT NULL THEN 1 ELSE 0 END AS [wellbeing]
    FROM [app_sys].[user]
    LEFT JOIN [app].[daily] ON [daily].[UserID] = [user].[UserID] AND [daily].[Date] = CAST([app_sys].GetUTCInUserTimezone(GETUTCDATE(), [user].[UserID]) AS Date)
    LEFT JOIN [app].[morning] ON [morning].[UserID] = [user].[UserID] AND [morning].[Date] = CAST([app_sys].GetUTCInUserTimezone(GETUTCDATE(), [user].[UserID]) AS Date)
    LEFT JOIN [app].[night] ON [night].[UserID] = [user].[UserID] AND [night].[Date] = CAST([app_sys].GetUTCInUserTimezone(GETUTCDATE(), [user].[UserID]) AS Date)
    LEFT JOIN [app].[physical] ON [physical].[UserID] = [user].[UserID] AND [physical].[Date] = CAST([app_sys].GetUTCInUserTimezone(GETUTCDATE(), [user].[UserID]) AS Date)
    -- LEFT JOIN [app].[sleep] ON [sleep].[UserID] = [user].[UserID] AND [sleep].[Date] = CAST([app_sys].GetUTCInUserTimezone(GETUTCDATE(), [user].[UserID]) AS Date)
    LEFT JOIN [app].[spendingFinancial] ON [spendingFinancial].[UserID] = [user].[UserID] AND [spendingFinancial].[Date] = CAST([app_sys].GetUTCInUserTimezone(GETUTCDATE(), [user].[UserID]) AS Date)
    LEFT JOIN [app].[spendingHealthcare] ON [spendingHealthcare].[UserID] = [user].[UserID] AND [spendingHealthcare].[Date] = CAST([app_sys].GetUTCInUserTimezone(GETUTCDATE(), [user].[UserID]) AS Date)
    LEFT JOIN [app].[spendingPersonal] ON [spendingPersonal].[UserID] = [user].[UserID] AND [spendingPersonal].[Date] = CAST([app_sys].GetUTCInUserTimezone(GETUTCDATE(), [user].[UserID]) AS Date)
    LEFT JOIN [app].[spendingRegular] ON [spendingRegular].[UserID] = [user].[UserID] AND [spendingRegular].[Date] = CAST([app_sys].GetUTCInUserTimezone(GETUTCDATE(), [user].[UserID]) AS Date)
    LEFT JOIN [app].[wellbeing] ON [wellbeing].[UserID] = [user].[UserID] AND [wellbeing].[Date] = CAST([app_sys].GetUTCInUserTimezone(GETUTCDATE(), [user].[UserID]) AS Date)
GO