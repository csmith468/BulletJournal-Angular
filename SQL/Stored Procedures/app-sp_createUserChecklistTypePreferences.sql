SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [app].[sp_createUserChecklistTypePreferences]
    @userID INT
    AS

    BEGIN

    INSERT INTO [app].[checklistTypePreferences] (
        [userID], [createdDatetime], [checklistTypeID], [isVisible])
    SELECT @userID AS [userID]
        ,GETUTCDATE() AS [createdDatetime]
        ,[checklistTypeID]
        ,1 AS [isVisible]
    FROM [app_sys].[checklistType] ct
    WHERE NOT EXISTS (
        SELECT [userID], [checklistTypeID]
        FROM [app].[checklistTypePreferences] prefs
        WHERE prefs.userID = @userID
            AND prefs.checklistTypeID = ct.checklistTypeID
    )

END
GO
