SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [app].[hiddenQuestions](
	[hiddenQuestionID] [int] IDENTITY(1,1) NOT NULL,
	[userID] [int] NOT NULL,
	[createdDatetime] [datetime] NULL,
	[modifiedDatetime] [datetime] NULL,
	[checklistTypeID] [int] NOT NULL,
	[label] [nvarchar](100) NOT NULL,
	[questionKindID] [int] NOT NULL,
	[standardQuestionID] [int] NULL,
	[minValue] [int] NULL,
	[maxValue] [int] NULL
) ON [PRIMARY]
GO
ALTER TABLE [app].[hiddenQuestions] ADD PRIMARY KEY CLUSTERED 
(
	[hiddenQuestionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [app].[hiddenQuestions]  WITH CHECK ADD  CONSTRAINT [FK_HiddenQuestionsQuestionType] FOREIGN KEY([questionKindID])
REFERENCES [app_sys].[questionKind] ([questionKindID])
GO
ALTER TABLE [app].[hiddenQuestions] CHECK CONSTRAINT [FK_HiddenQuestionsQuestionType]
GO
ALTER TABLE [app].[hiddenQuestions]  WITH CHECK ADD  CONSTRAINT [FK_HiddenQuestionsStandard] FOREIGN KEY([standardQuestionID])
REFERENCES [app_sys].[standardQuestions] ([standardQuestionID])
GO
ALTER TABLE [app].[hiddenQuestions] CHECK CONSTRAINT [FK_HiddenQuestionsStandard]
GO
ALTER TABLE [app].[hiddenQuestions]  WITH CHECK ADD  CONSTRAINT [FK_HiddenQuestionsUser] FOREIGN KEY([userID])
REFERENCES [app].[user] ([userID])
GO
ALTER TABLE [app].[hiddenQuestions] CHECK CONSTRAINT [FK_HiddenQuestionsUser]
GO
