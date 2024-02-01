SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[v_timezoneLocation] AS 
    SELECT [timezoneLocation].[TimezoneLocationID]
        ,CASE WHEN [timezoneLocation].[TimezoneLocation] LIKE 'UTC%' THEN [timezoneLocation].[TimezoneLocation]
            ELSE CONCAT([timezoneLocation].[TimezoneLocation], ' ', 
            SUBSTRING([timezone].[TimezoneName], 0, CHARINDEX(')', [timezone].[TimezoneName])+1)) 
         END AS [TimezoneLocationName]
    FROM [BulletJournalApp].[dbo].[timezoneLocation]
    JOIN [dbo].[timezone] ON [timezone].[TimezoneID] = [timezoneLocation].[TimezoneID] 
GO
