SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [app].[sp_createUserGeneralPreferences]
    @userID INT
    AS

    BEGIN

    INSERT INTO [app].[generalPreferences] (
        [userID], [createdDatetime], [showUnsavedChangesGuard], [showDeleteGuard])
    SELECT @userID AS [userID]
        ,GETUTCDATE() AS [createdDatetime]
        ,1 AS [showUnsavedChangesGuard]
        ,1 AS [showDeleteGuard]
    WHERE NOT EXISTS (
        SELECT [userID]
        FROM [app].[generalPreferences] prefs
        WHERE prefs.userID = @userID
    )

END
GO
