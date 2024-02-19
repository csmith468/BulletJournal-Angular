SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[questionPreferencesSetup](
	[questionPreferencesSetupID] [int] IDENTITY(1,1) NOT NULL,
	[tableName] [nvarchar](100) NOT NULL,
	[key] [nvarchar](100) NOT NULL,
	[questionNumber] [int] NULL,
	[label] [nvarchar](100) NOT NULL,
	[isQuestionVisible] [bit] NULL,
	[questionOrder] [int] NULL,
	[baseType] [nvarchar](100) NOT NULL,
	[typeDetail] [nvarchar](100) NOT NULL,
	[minValue] [int] NULL,
	[maxValue] [int] NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[questionPreferencesSetup] ADD PRIMARY KEY CLUSTERED 
(
	[questionPreferencesSetupID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
