SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [app].[v_morningChecklist] AS
    SELECT [MorningChecklistID]
      ,[UserID]
      ,[Date]
      ,[GlassOfWater]
      ,[Meds]
      ,[Vitamins]
      ,[Breakfast]
      ,app.[GetUTCInUserTimezone]([ModifiedDatetime], [UserID]) AS [ModifiedDatetime]
    FROM [app].[morningChecklist]
GO
