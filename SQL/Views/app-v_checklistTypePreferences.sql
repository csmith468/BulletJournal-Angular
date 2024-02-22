SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [app].[v_checklistTypePreferences] AS 
    SELECT cp.[checklistTypePreferencesID]
        ,cp.[userID]
        ,ct.[key]
        ,ct.[label]
        ,cp.[isVisible]
        ,ct.[icon]
        ,ct.[category]
        ,ct.[isHeader]
        ,ct.[defaultOrder]
    FROM [app].[checklistTypePreferences] cp
    LEFT JOIN [app_sys].[checklistType] ct ON ct.[checklistTypeID] = cp.[checklistTypeID]
GO
