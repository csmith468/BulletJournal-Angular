SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [app_sys].[standardQuestions](
	[standardQuestionID] [int] IDENTITY(1,1) NOT NULL,
	[checklistTypeID] [int] NOT NULL,
	[label] [nvarchar](100) NOT NULL,
	[defaultOrder] [int] NOT NULL,
	[questionKindID] [int] NOT NULL,
	[defaultKey] [nvarchar](100) NOT NULL,
	[defaultKeyNumber] [int] NULL,
	[minValue] [int] NULL,
	[maxValue] [int] NULL
) ON [PRIMARY]
GO
ALTER TABLE [app_sys].[standardQuestions] ADD PRIMARY KEY CLUSTERED 
(
	[standardQuestionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [app_sys].[standardQuestions]  WITH CHECK ADD  CONSTRAINT [FK_StandardQuestionKind] FOREIGN KEY([questionKindID])
REFERENCES [app_sys].[questionKind] ([questionKindID])
GO
ALTER TABLE [app_sys].[standardQuestions] CHECK CONSTRAINT [FK_StandardQuestionKind]
GO
ALTER TABLE [app_sys].[standardQuestions]  WITH CHECK ADD  CONSTRAINT [FK_StandardQuestionTable] FOREIGN KEY([checklistTypeID])
REFERENCES [app_sys].[checklistType] ([checklistTypeID])
GO
ALTER TABLE [app_sys].[standardQuestions] CHECK CONSTRAINT [FK_StandardQuestionTable]
GO
