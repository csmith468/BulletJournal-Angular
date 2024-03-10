SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [checklist].[dream](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[userID] [int] NOT NULL,
	[createdDatetime] [datetime] NULL,
	[modifiedDatetime] [datetime] NULL,
	[date] [date] NOT NULL,
	[question1] [float] NULL
) ON [PRIMARY]
GO
ALTER TABLE [checklist].[dream] ADD PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [checklist].[dream]  WITH CHECK ADD  CONSTRAINT [FK_dreamUser] FOREIGN KEY([userID])
REFERENCES [app].[user] ([userID])
GO
ALTER TABLE [checklist].[dream] CHECK CONSTRAINT [FK_dreamUser]
GO
