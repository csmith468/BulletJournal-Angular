SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [checklist].[v_completedToday] AS 
    SELECT
        [user].[UserID],
        CAST([app_sys].fn_getUTCInUserTimezone(GETUTCDATE(), [user].[UserID]) AS Date) AS [Date],
        CASE WHEN [daily].[userID] IS NOT NULL THEN 1 ELSE 0 END AS [daily],
        CASE WHEN [morning].[userID] IS NOT NULL THEN 1 ELSE 0 END AS [morning],
        CASE WHEN [night].[userID] IS NOT NULL THEN 1 ELSE 0 END AS [night],
        CASE WHEN [physical].[userID] IS NOT NULL THEN 1 ELSE 0 END AS [physical],
        -- CASE WHEN [sleep].[userID] IS NOT NULL THEN 1 ELSE 0 END AS [sleep],
        CASE WHEN [spendingFinancial].[userID] IS NOT NULL THEN 1 ELSE 0 END AS [spendingFinancial],
        CASE WHEN [spendingHealthcare].[userID] IS NOT NULL THEN 1 ELSE 0 END AS [spendingHealthcare],
        CASE WHEN [spendingPersonal].[userID] IS NOT NULL THEN 1 ELSE 0 END AS [spendingPersonal],
        CASE WHEN [spendingRegular].[userID] IS NOT NULL THEN 1 ELSE 0 END AS [spendingRegular],
        CASE WHEN [wellbeing].[userID] IS NOT NULL THEN 1 ELSE 0 END AS [wellbeing]
    FROM [app].[user]
    LEFT JOIN [checklist].[daily] ON [daily].[userID] = [user].[UserID] AND [daily].[Date] = CAST([app_sys].fn_getUTCInUserTimezone(GETUTCDATE(), [user].[UserID]) AS Date)
    LEFT JOIN [checklist].[morning] ON [morning].[userID] = [user].[UserID] AND [morning].[Date] = CAST([app_sys].fn_getUTCInUserTimezone(GETUTCDATE(), [user].[UserID]) AS Date)
    LEFT JOIN [checklist].[night] ON [night].[userID] = [user].[UserID] AND [night].[Date] = CAST([app_sys].fn_getUTCInUserTimezone(GETUTCDATE(), [user].[UserID]) AS Date)
    LEFT JOIN [checklist].[physical] ON [physical].[userID] = [user].[UserID] AND [physical].[Date] = CAST([app_sys].fn_getUTCInUserTimezone(GETUTCDATE(), [user].[UserID]) AS Date)
    -- LEFT JOIN [checklist].[sleep] ON [sleep].[userID] = [user].[UserID] AND [sleep].[Date] = CAST([app_sys].fn_getUTCInUserTimezone(GETUTCDATE(), [user].[UserID]) AS Date)
    LEFT JOIN [checklist].[spendingFinancial] ON [spendingFinancial].[userID] = [user].[UserID] AND [spendingFinancial].[Date] = CAST([app_sys].fn_getUTCInUserTimezone(GETUTCDATE(), [user].[UserID]) AS Date)
    LEFT JOIN [checklist].[spendingHealthcare] ON [spendingHealthcare].[userID] = [user].[UserID] AND [spendingHealthcare].[Date] = CAST([app_sys].fn_getUTCInUserTimezone(GETUTCDATE(), [user].[UserID]) AS Date)
    LEFT JOIN [checklist].[spendingPersonal] ON [spendingPersonal].[userID] = [user].[UserID] AND [spendingPersonal].[Date] = CAST([app_sys].fn_getUTCInUserTimezone(GETUTCDATE(), [user].[UserID]) AS Date)
    LEFT JOIN [checklist].[spendingRegular] ON [spendingRegular].[userID] = [user].[UserID] AND [spendingRegular].[Date] = CAST([app_sys].fn_getUTCInUserTimezone(GETUTCDATE(), [user].[UserID]) AS Date)
    LEFT JOIN [checklist].[wellbeing] ON [wellbeing].[userID] = [user].[UserID] AND [wellbeing].[Date] = CAST([app_sys].fn_getUTCInUserTimezone(GETUTCDATE(), [user].[UserID]) AS Date)
GO
