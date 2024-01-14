SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [bja].[sleep](
	[SleepID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [int] NOT NULL,
	[BedStartInstant] [datetime] NULL,
	[SleepStartInstant] [datetime] NULL,
	[SleepFinishInstant] [datetime] NULL,
	[BedFinishInstant] [datetime] NULL,
	[BedOnTime] [bit] NULL,
	[WakeOnTime] [bit] NULL,
	[EnergyLevel] [int] NULL,
	[Type] [nvarchar](50) NULL,
	[Notes] [nvarchar](max) NULL,
	[ModifiedDatetime] [datetime] NOT NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [bja].[sleep] ADD PRIMARY KEY CLUSTERED 
(
	[SleepID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [bja].[sleep] ADD  DEFAULT (getUTCdate()) FOR [ModifiedDatetime]
GO
