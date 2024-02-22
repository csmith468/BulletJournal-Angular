SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [app_sys].[v_questionKind] AS
    SELECT [questionKindID]
        ,[kindBase]
        ,[kindDetail]
        ,[includeInCharts]
        ,[isPercentage]
        ,[isCurrency]
        ,[minValue]
        ,[maxValue]
        ,[minDecimalPlacesYAxis]
        ,[maxDecimalPlacesYAxis]
        ,[minDecimalPlacesYLabel]
        ,[maxDecimalPlacesYLabel]
    FROM [BulletJournalApp].[app_sys].[questionKind]
GO
