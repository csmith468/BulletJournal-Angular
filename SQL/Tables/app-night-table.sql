SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [app].[night](
	[NightID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [int] NOT NULL,
	[Date] [date] NOT NULL,
	[GlassOfWater] [bit] NULL,
	[Meds] [bit] NULL,
	[Vitamins] [bit] NULL,
	[WashFace] [bit] NULL,
	[Floss] [bit] NULL,
	[Retainer] [bit] NULL
) ON [PRIMARY]
GO
ALTER TABLE [app].[night] ADD PRIMARY KEY CLUSTERED 
(
	[NightID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [app].[night]  WITH CHECK ADD  CONSTRAINT [FK_night_User] FOREIGN KEY([UserID])
REFERENCES [app_sys].[user] ([UserID])
GO
ALTER TABLE [app].[night] CHECK CONSTRAINT [FK_night_User]
GO
