SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [checklist].[zz_sleep](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[userID] [int] NOT NULL,
	[createdDatetime] [datetime] NULL,
	[modifiedDatetime] [datetime] NULL,
	[bedStart] [datetime] NULL,
	[sleepStart] [datetime] NULL,
	[sleepFinish] [datetime] NULL,
	[bedFinish] [datetime] NULL,
	[bedOnTime] [bit] NULL,
	[wakeOnTime] [bit] NULL,
	[energyLevel] [int] NULL,
	[snoozed] [bit] NULL,
	[type] [nvarchar](50) NULL
) ON [PRIMARY]
GO
ALTER TABLE [checklist].[zz_sleep] ADD PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [checklist].[zz_sleep]  WITH CHECK ADD  CONSTRAINT [FK_Sleep_User] FOREIGN KEY([userID])
REFERENCES [app].[user] ([userID])
GO
ALTER TABLE [checklist].[zz_sleep] CHECK CONSTRAINT [FK_Sleep_User]
GO
