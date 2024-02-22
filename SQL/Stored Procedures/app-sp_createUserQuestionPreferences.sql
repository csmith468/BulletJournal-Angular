SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [app].[sp_createUserQuestionPreferences]
    @userID INT
    AS

    BEGIN

    INSERT INTO [app].[questionPreferences] (
        [userID], [createdDatetime], [checklistTypeID], [key], [keyNumber], [label], 
        [questionKindID], [standardQuestionID], [isVisible], [questionOrder], [minValue], [maxValue])
    SELECT @userID AS [userID]
        ,GETUTCDATE() AS [createdDatetime]
        ,[checklistTypeID]
        ,[defaultKey] AS [key]
        ,[defaultKeyNumber] AS [keyNumber]
        ,[label]
        ,[questionKindID]
        ,[standardQuestionID]
        ,1 AS [isVisible]
        ,[defaultOrder] AS [questionOrder]
        ,[minValue]
        ,[maxValue]
    FROM [app_sys].[standardQuestions] sq
    WHERE NOT EXISTS (
        SELECT [userID], [standardQuestionID]
        FROM [app].[questionPreferences] prefs
        WHERE prefs.userID = @userID
            AND prefs.[standardQuestionID] = sq.[standardQuestionID]
    )


END
GO
