SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[timezoneBias](
	[TimezoneBiasID] [int] IDENTITY(1,1) NOT NULL,
	[NormalDayOfWeek] [int] NULL,
	[NormalDayOfWeekOccurrence] [int] NULL,
	[NormalMonth] [int] NULL,
	[NormalTimeOfDay] [time](7) NULL,
	[TransitionBias] [int] NULL,
	[TransitionDayOfWeek] [int] NULL,
	[TransitionDayOfWeekOccurrence] [int] NULL,
	[TransitionMonth] [int] NULL,
	[TransitionTimeOfDay] [time](7) NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[timezoneBias] ADD PRIMARY KEY CLUSTERED 
(
	[TimezoneBiasID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
