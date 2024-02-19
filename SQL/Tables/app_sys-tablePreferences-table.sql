SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [app_sys].[tablePreferences](
	[tablePreferencesID] [int] IDENTITY(1,1) NOT NULL,
	[userID] [int] NOT NULL,
	[tableName] [nvarchar](100) NULL,
	[isTableVisible] [bit] NULL
) ON [PRIMARY]
GO
ALTER TABLE [app_sys].[tablePreferences] ADD PRIMARY KEY CLUSTERED 
(
	[tablePreferencesID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [app_sys].[tablePreferences]  WITH CHECK ADD  CONSTRAINT [FK_tablePreferences_User] FOREIGN KEY([userID])
REFERENCES [app_sys].[user] ([userID])
GO
ALTER TABLE [app_sys].[tablePreferences] CHECK CONSTRAINT [FK_tablePreferences_User]
GO
