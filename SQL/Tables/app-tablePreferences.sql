SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [app].[tablePreferences](
	[tablePreferencesID] [int] IDENTITY(1,1) NOT NULL,
	[userID] [int] NOT NULL,
	[key] [nvarchar](100) NOT NULL,
	[label] [nvarchar](100) NOT NULL,
	[isVisible] [bit] NULL
) ON [PRIMARY]
GO
ALTER TABLE [app].[tablePreferences] ADD PRIMARY KEY CLUSTERED 
(
	[tablePreferencesID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [app].[tablePreferences]  WITH CHECK ADD  CONSTRAINT [FK_tablePreferences_User] FOREIGN KEY([userID])
REFERENCES [app].[user] ([userID])
GO
ALTER TABLE [app].[tablePreferences] CHECK CONSTRAINT [FK_tablePreferences_User]
GO
