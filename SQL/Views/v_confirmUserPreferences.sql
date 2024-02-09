SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[v_confirmUserPreferences] AS 
    SELECT DISTINCT [user].[UserID]
        ,[user].[Email]
        ,CASE WHEN [tablePreferences].[UserID] IS NOT NULL THEN 1 ELSE 0 END AS [Table Preferences Exist]
        ,CASE WHEN [questionPreferences].[UserID] IS NOT NULL THEN 1 ELSE 0 END AS [Question Preferences Exist]
    FROM [app_sys].[user]
    LEFT JOIN [app_sys].[tablePreferences] ON [tablePreferences].[UserID] = [user].[UserID]
    LEFT JOIN [app_sys].[questionPreferences] ON [questionPreferences].[UserID] = [user].[UserID]

GO
