SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [app].[checklistTypePreferences](
	[checklistTypePreferencesID] [int] IDENTITY(1,1) NOT NULL,
	[userID] [int] NOT NULL,
	[createdDatetime] [datetime] NULL,
	[modifiedDatetime] [datetime] NULL,
	[checklistTypeID] [int] NOT NULL,
	[isVisible] [bit] NOT NULL
) ON [PRIMARY]
GO
ALTER TABLE [app].[checklistTypePreferences] ADD PRIMARY KEY CLUSTERED 
(
	[checklistTypePreferencesID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [app].[checklistTypePreferences]  WITH CHECK ADD  CONSTRAINT [FK_tablePreferences_Type] FOREIGN KEY([checklistTypeID])
REFERENCES [app_sys].[checklistType] ([checklistTypeID])
GO
ALTER TABLE [app].[checklistTypePreferences] CHECK CONSTRAINT [FK_tablePreferences_Type]
GO
ALTER TABLE [app].[checklistTypePreferences]  WITH CHECK ADD  CONSTRAINT [FK_tablePreferences_User] FOREIGN KEY([userID])
REFERENCES [app].[user] ([userID])
GO
ALTER TABLE [app].[checklistTypePreferences] CHECK CONSTRAINT [FK_tablePreferences_User]
GO
