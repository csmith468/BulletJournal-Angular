SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [app].[wellbeing](
	[WellbeingID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [int] NOT NULL,
	[Date] [date] NOT NULL,
	[DayRating] [float] NULL,
	[Happiness] [float] NULL,
	[Sadness] [float] NULL,
	[Shame] [float] NULL,
	[Anger] [float] NULL,
	[Anxiety] [float] NULL,
	[Overwhelmed] [float] NULL,
	[Irritable] [float] NULL,
	[Energy] [float] NULL
) ON [PRIMARY]
GO
ALTER TABLE [app].[wellbeing] ADD PRIMARY KEY CLUSTERED 
(
	[WellbeingID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [app].[wellbeing]  WITH CHECK ADD  CONSTRAINT [FK_wellbeing_User] FOREIGN KEY([UserID])
REFERENCES [app].[user] ([UserID])
GO
ALTER TABLE [app].[wellbeing] CHECK CONSTRAINT [FK_wellbeing_User]
GO
