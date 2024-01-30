SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [app].[physical](
	[PhysicalID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [int] NOT NULL,
	[PainLevel] [float] NULL,
	[Headache] [bit] NULL,
	[Nausea] [bit] NULL,
	[StomachAche] [bit] NULL,
	[SoreThroat] [bit] NULL,
	[Cough] [bit] NULL,
	[Congestion] [bit] NULL,
	[NightSweats] [bit] NULL,
	[BackPain] [bit] NULL,
	[JawPain] [bit] NULL,
	[KneePain] [bit] NULL,
	[NoseBleed] [bit] NULL,
	[PeriodCramps] [bit] NULL,
	[Hangover] [bit] NULL,
	[MuscleSoreness] [bit] NULL
) ON [PRIMARY]
GO
ALTER TABLE [app].[physical] ADD PRIMARY KEY CLUSTERED 
(
	[PhysicalID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
