SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [app_sys].[userChecklistPreferences](
	[userChecklistPreferencesID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [int] NOT NULL,
	[TableName] [nvarchar](100) NULL,
	[IsTableVisible] [bit] NULL
) ON [PRIMARY]
GO
ALTER TABLE [app_sys].[userChecklistPreferences] ADD PRIMARY KEY CLUSTERED 
(
	[userChecklistPreferencesID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [app_sys].[userChecklistPreferences]  WITH CHECK ADD  CONSTRAINT [FK_userChecklistPreferences_User] FOREIGN KEY([UserID])
REFERENCES [app_sys].[user] ([UserID])
GO
ALTER TABLE [app_sys].[userChecklistPreferences] CHECK CONSTRAINT [FK_userChecklistPreferences_User]
GO
