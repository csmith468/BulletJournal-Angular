SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [app_sys].[hiddenQuestions](
	[hiddenQuestionID] [int] IDENTITY(1,1) NOT NULL,
	[userID] [int] NOT NULL,
	[tableName] [nvarchar](100) NOT NULL,
	[label] [nvarchar](100) NOT NULL,
	[questionTypeID] [int] NOT NULL,
	[standardQuestionID] [int] NULL,
	[minValue] [int] NULL,
	[maxValue] [int] NULL
) ON [PRIMARY]
GO
ALTER TABLE [app_sys].[hiddenQuestions] ADD PRIMARY KEY CLUSTERED 
(
	[hiddenQuestionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO

ALTER TABLE [app_sys].[hiddenQuestions]  WITH CHECK ADD  CONSTRAINT [FK_HiddenQuestionsUser] FOREIGN KEY([userID])
REFERENCES [app_sys].[user] ([userID])
GO
ALTER TABLE [app_sys].[hiddenQuestions] CHECK CONSTRAINT [FK_HiddenQuestionsUser]
GO

ALTER TABLE [app_sys].[hiddenQuestions]  WITH CHECK ADD  CONSTRAINT [FK_HiddenQuestionsQuestionType] FOREIGN KEY([questionTypeID])
REFERENCES [app_sys].[questionTypes] ([questionTypeID])
GO
ALTER TABLE [app_sys].[hiddenQuestions] CHECK CONSTRAINT [FK_HiddenQuestionsQuestionType]
GO

ALTER TABLE [app_sys].[hiddenQuestions]  WITH CHECK ADD  CONSTRAINT [FK_HiddenQuestionsStandard] FOREIGN KEY([standardQuestionID])
REFERENCES [dbo].[standardQuestions] ([standardQuestionID])
GO
ALTER TABLE [app_sys].[hiddenQuestions] CHECK CONSTRAINT [FK_HiddenQuestionsStandard]
GO

