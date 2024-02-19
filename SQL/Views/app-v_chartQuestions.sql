SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [app].[v_chartQuestions] AS
    SELECT qp.[questionPreferencesID]
        ,qp.[userID]
        ,qp.[tableName]
        ,qp.[key]
        ,qp.[label]
        ,qp.[questionKindID]
        ,qk.[kindBase]
        ,qk.[kindDetail]
        ,COALESCE(qp.[questionOrder], qp.[keyNumber]) AS [questionOrder]
    FROM [app].[questionPreferences] qp
    JOIN [app_sys].[questionKinds] qk ON qk.[questionKindID] = qp.[questionKindID]
    WHERE qk.[includeInCharts] = 1 AND qp.[isVisible] = 1
GO
