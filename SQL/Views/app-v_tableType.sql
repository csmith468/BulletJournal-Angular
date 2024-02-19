SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [app].[v_tableType] AS 
    SELECT tp.[tablePreferencesID]
        ,tp.[userID]
        ,tp.[key]
        ,tp.[label]
        ,t.[icon]
        ,t.[category]
        ,t.[isHeader]
    FROM [app].[tablePreferences] tp
    LEFT JOIN [app_sys].[tableType] t ON t.[key] = tp.[key]
    WHERE tp.[isVisible] = 1
GO
