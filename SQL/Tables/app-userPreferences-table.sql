SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [app].[userPreferences](
	[UserPreferencesID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [int] NOT NULL,
	[TableName] [nvarchar](100) NULL,
	[ColumnName] [nvarchar](100) NULL,
	[IsColumnVisible] [bit] NULL
) ON [PRIMARY]
GO
ALTER TABLE [app].[userPreferences] ADD PRIMARY KEY CLUSTERED 
(
	[UserPreferencesID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [app].[userPreferences]  WITH CHECK ADD  CONSTRAINT [FK_userPreferences_User] FOREIGN KEY([UserID])
REFERENCES [app].[user] ([UserID])
GO
ALTER TABLE [app].[userPreferences] CHECK CONSTRAINT [FK_userPreferences_User]
GO
