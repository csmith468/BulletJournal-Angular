SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [app_sys].[v_confirmUserPreferences] AS 
    SELECT DISTINCT [user].[UserID]
        ,[user].[Email]
        ,CASE WHEN [checklistTypePreferences].[UserID] IS NOT NULL THEN 1 ELSE 0 END AS [Checklist Type Preferences Exist]
        ,CASE WHEN [questionPreferences].[UserID] IS NOT NULL THEN 1 ELSE 0 END AS [Question Preferences Exist]
    FROM [app].[user]
    LEFT JOIN [app].[checklistTypePreferences] ON [checklistTypePreferences].[UserID] = [user].[UserID]
    LEFT JOIN [app].[questionPreferences] ON [questionPreferences].[UserID] = [user].[UserID]

GO
