SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[questionPreferencesSetup](
	[QuestionPreferencesSetupID] [int] IDENTITY(1,1) NOT NULL,
	[TableName] [nvarchar](100) NOT NULL,
	[QuestionKey] [nvarchar](100) NOT NULL,
	[QuestionNumber] [int] NULL,
	[QuestionLabel] [nvarchar](100) NOT NULL,
	[IsQuestionVisible] [bit] NULL,
	[QuestionOrder] [int] NULL,
	[Type] [nvarchar](100) NOT NULL,
	[TypeDetail] [nvarchar](100) NOT NULL,
	[MinValue] [int] NULL,
	[MaxValue] [int] NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[questionPreferencesSetup] ADD PRIMARY KEY CLUSTERED 
(
	[QuestionPreferencesSetupID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
