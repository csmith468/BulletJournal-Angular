SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [app].[generalPreferences](
	[generalPreferencesID] [int] IDENTITY(1,1) NOT NULL,
	[userID] [int] NOT NULL,
	[createdDatetime] [datetime] NULL,
	[modifiedDatetime] [int] NULL,
	[showUnsavedChangesGuard] [bit] NOT NULL,
	[showDeleteGuard] [bit] NOT NULL
) ON [PRIMARY]
GO
ALTER TABLE [app].[generalPreferences] ADD PRIMARY KEY CLUSTERED 
(
	[generalPreferencesID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [app].[generalPreferences]  WITH CHECK ADD  CONSTRAINT [FK_generalPreferences_User] FOREIGN KEY([userID])
REFERENCES [app].[user] ([userID])
GO
ALTER TABLE [app].[generalPreferences] CHECK CONSTRAINT [FK_generalPreferences_User]
GO
