SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [app_sys].[v_checklistType] AS
    SELECT [checklistTypeID]
        ,[key]
        ,[label]
        ,[icon]
        ,[category]
        ,[isHeader]
        ,[defaultOrder]
    FROM [BulletJournalApp].[app_sys].[checklistType]
GO
