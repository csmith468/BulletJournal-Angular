SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER VIEW [app].[v_questionPreferences] AS
    SELECT qp.[questionPreferencesID]
        ,qp.[userID]
        ,ct.[label] AS [checklistTypeName]
        ,qp.[key]
        ,qp.[label]
        ,qp.[isVisible]
        ,CASE WHEN ct.[includeInCharts] = 1 THEN qk.[includeInCharts] ELSE 0 END AS [includeInCharts]
        ,ct.[canUpdateQuestions]
        ,qp.[questionKindID]
        ,qk.[kindBase]
        ,qk.[kindDetail]
        ,COALESCE(qp.[questionOrder], qp.[keyNumber]) AS [questionOrder]
        ,COALESCE(qp.[minValue], qk.[minValue]) AS [minValue]
        ,COALESCE(qp.[maxValue], qk.[maxValue]) AS [maxValue]
    FROM [app].[questionPreferences] qp
    JOIN [app_sys].[questionKind] qk ON qk.[questionKindID] = qp.[questionKindID]
    JOIN [app_sys].[checklistType] ct ON ct.[checklistTypeID] = qp.[checklistTypeID]
GO
