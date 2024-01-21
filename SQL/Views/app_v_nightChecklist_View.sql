SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [app].[v_nightChecklist] AS
    SELECT [NightChecklistID]
      ,[UserID]
      ,[Date]
      ,[GlassOfWater]
      ,[Meds]
      ,[Vitamins]
      ,[WashFace]
      ,[Floss]
      ,[CheckEmails]
      ,[CheckTexts]
      ,[Mouthguard]
      ,app.[GetUTCInUserTimezone]([ModifiedDatetime], [UserID]) AS [ModifiedDatetime]
    FROM [BulletJournalApp].[app].[nightChecklist]
GO
