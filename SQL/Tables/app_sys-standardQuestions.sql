SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [app_sys].[standardQuestions](
	[standardQuestionID] [int] IDENTITY(1,1) NOT NULL,
	[tableName] [nvarchar](100) NOT NULL,
	[key] [nvarchar](100) NOT NULL,
	[keyNumber] [int] NULL,
	[label] [nvarchar](100) NOT NULL,
	[questionOrder] [int] NULL,
	[baseKind] [nvarchar](100) NOT NULL,
	[kindDetail] [nvarchar](100) NOT NULL,
	[minValue] [int] NULL,
	[maxValue] [int] NULL
) ON [PRIMARY]
GO
ALTER TABLE [app_sys].[standardQuestions] ADD PRIMARY KEY CLUSTERED 
(
	[standardQuestionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
