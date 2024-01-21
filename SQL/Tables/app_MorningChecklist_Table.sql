SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [app].[morningChecklist](
	[MorningChecklistID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [int] NOT NULL,
	[Date] [date] NOT NULL,
	[GlassOfWater] [bit] NULL,
	[Meds] [bit] NULL,
	[Vitamins] [bit] NULL,
	[Breakfast] [bit] NULL
) ON [PRIMARY]
GO
ALTER TABLE [app].[morningChecklist] ADD PRIMARY KEY CLUSTERED 
(
	[MorningChecklistID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO