SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [app].[user](
	[userID] [int] IDENTITY(1,1) NOT NULL,
	[email] [nvarchar](100) NOT NULL,
	[firstName] [nvarchar](50) NOT NULL,
	[lastName] [nvarchar](50) NOT NULL,
	[passwordHash] [varbinary](max) NULL,
	[passwordSalt] [varbinary](max) NULL,
	[timezoneLocationID] [int] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [app].[user] ADD PRIMARY KEY CLUSTERED 
(
	[userID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
