SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [checklist].[daily](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[userID] [int] NOT NULL,
	[createdDatetime] [datetime] NULL,
	[modifiedDatetime] [datetime] NULL,
	[date] [date] NOT NULL,
	[question1] [float] NULL,
	[question2] [float] NULL,
	[question3] [float] NULL,
	[question4] [float] NULL,
	[question5] [float] NULL,
	[question6] [float] NULL,
	[question7] [float] NULL,
	[question8] [float] NULL,
	[question9] [float] NULL,
	[question10] [float] NULL,
	[question11] [float] NULL,
	[question12] [float] NULL,
	[question13] [float] NULL,
	[question14] [float] NULL,
	[question15] [float] NULL,
	[question16] [float] NULL,
	[question17] [float] NULL,
	[question18] [float] NULL,
	[question19] [float] NULL,
	[question20] [float] NULL,
	[question21] [float] NULL,
	[question22] [float] NULL,
	[question23] [float] NULL,
	[question24] [float] NULL,
	[question25] [float] NULL
) ON [PRIMARY]
GO
ALTER TABLE [checklist].[daily] ADD PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [checklist].[daily]  WITH CHECK ADD  CONSTRAINT [FK_dailyUser] FOREIGN KEY([userID])
REFERENCES [app].[user] ([userID])
GO
ALTER TABLE [checklist].[daily] CHECK CONSTRAINT [FK_dailyUser]
GO
