SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [app].[questions](
	[QuestionID] [int] IDENTITY(1,1) NOT NULL,
	[Source] [nvarchar](100) NOT NULL,
	[Key] [nvarchar](100) NOT NULL,
	[Type] [nvarchar](100) NOT NULL,
	[TypeDetail] [nvarchar](100) NOT NULL,
	[Question] [nvarchar](255) NOT NULL,
	[Options] [nvarchar](max) NULL,
	[MinValue] [int] NULL,
	[MaxValue] [int] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [app].[questions] ADD PRIMARY KEY CLUSTERED 
(
	[QuestionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
