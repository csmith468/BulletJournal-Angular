SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [app].[v_checklistQuestions] AS
    SELECT qp.[questionPreferencesID]
        ,qp.[userID]
        ,qp.[tableName]
        ,qp.[key]
        ,qp.[label]
        ,qp.[questionKindID]
        ,qk.[kindBase]
        ,qk.[kindDetail]
        ,qp.[questionOrder]
        ,COALESCE(qp.[minValue], qk.[minValue]) AS [minValue]
        ,COALESCE(qp.[maxValue], qk.[maxValue]) AS [maxValue]
    FROM [app].[questionPreferences] qp
    JOIN [app_sys].[questionKinds] qk ON qk.[questionKindID] = qp.[questionKindID]
    WHERE qp.[isVisible] = 1
GO
