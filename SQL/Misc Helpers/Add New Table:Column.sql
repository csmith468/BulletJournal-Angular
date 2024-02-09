DECLARE @tableName NVARCHAR = '';
DECLARE @tableLabel NVARCHAR = '';
DECLARE @columnName NVARCHAR = '';


INSERT INTO [dbo].[questionPreferencesSetup]
SELECT @tableName AS [TableName],
    @columnName AS [ColumnName]
WHERE NOT EXISTS (SELECT 1 FROM [dbo].[questionPreferencesSetup]
                    WHERE [TableName] = @tableName 
                    AND [ColumnName] = @columnName)

-- UPDATE EVERYTHING AFTER KEY
INSERT INTO [app_sys].[questions]
SELECT @tableLabel AS [Source],
    @columnName AS [Key],
    '' AS [Type],
    '' AS [TypeDetail],
    '' AS [Question], 
    NULL AS [Options],
    NULL AS [MinValue],
    NULL AS [MaxValue]
WHERE NOT EXISTS (SELECT 1 FROM [app_sys].[questions]
                    WHERE [Source] = @tableLabel 
                    AND [Key] = @columnName)


INSERT INTO [app_sys].[questionPreferences]
SELECT [UserID],
    @tableName AS [TableName],
    @columnName AS [ColumnName],
    1 AS [IsColumnVisible]
FROM [app_sys].[user]
WHERE NOT EXISTS (SELECT 1 FROM [app_sys].[questionPreferences]
                    WHERE [TableName] = @tableName
                    AND [ColumnName] = @columnName
                    AND [questionPreferences].[UserID] = [user].[UserID])


INSERT INTO [dbo].[tablePreferencesSetup]
SELECT @tableName AS [TableName]
WHERE NOT EXISTS (SELECT [TableName] FROM [dbo].[tablePreferencesSetup]
                    WHERE [TableName] = @tableName)


-- UPDATE EVERYTHING AFTER DisplayName
INSERT INTO [app_sys].[tables]
SELECT @tableName AS [Key],
    @tableLabel AS [DisplayName],
    '' AS [Icon],
    NULL AS [Category],
    NULL AS [IsHeader]
WHERE NOT EXISTS (SELECT [Key] FROM [app_sys].[tables]
                    WHERE [Key] = @tableName)


INSERT INTO [app_sys].[tablePreferences]
SELECT [UserID],
    @tableName AS [TableName],
    1 AS [IsTableVisible]
FROM [app_sys].[user]
WHERE NOT EXISTS (SELECT 1 FROM [app_sys].[tablePreferences]
                    WHERE [TableName] = @tableName
                    AND [tablePreferences].[UserID] = [user].[UserID])