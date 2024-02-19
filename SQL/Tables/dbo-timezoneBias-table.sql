SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[timezoneBias](
	[timezoneBiasID] [int] IDENTITY(1,1) NOT NULL,
	[normalDayOfWeek] [int] NULL,
	[normalDayOfWeekOccurrence] [int] NULL,
	[normalMonth] [int] NULL,
	[normalTimeOfDay] [time](7) NULL,
	[transitionBias] [int] NULL,
	[transitionDayOfWeek] [int] NULL,
	[transitionDayOfWeekOccurrence] [int] NULL,
	[transitionMonth] [int] NULL,
	[transitionTimeOfDay] [time](7) NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[timezoneBias] ADD PRIMARY KEY CLUSTERED 
(
	[timezoneBiasID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
