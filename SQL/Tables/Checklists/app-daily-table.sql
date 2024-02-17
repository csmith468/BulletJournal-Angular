SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [app].[daily](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [int] NOT NULL,
	[Date] [date] NOT NULL,
	[Question1] [float] NULL,
	[Question2] [float] NULL,
	[Question3] [float] NULL,
	[Question4] [float] NULL,
	[Question5] [float] NULL,
	[Question6] [float] NULL,
	[Question7] [float] NULL,
	[Question8] [float] NULL,
	[Question9] [float] NULL,
	[Question10] [float] NULL,
	[Question11] [float] NULL,
	[Question12] [float] NULL,
	[Question13] [float] NULL,
	[Question14] [float] NULL,
	[Question15] [float] NULL,
	[Question16] [float] NULL,
	[Question17] [float] NULL,
	[Question18] [float] NULL,
	[Question19] [float] NULL,
	[Question20] [float] NULL,
	[Question21] [float] NULL,
	[Question22] [float] NULL,
	[Question23] [float] NULL,
	[Question24] [float] NULL,
	[Question25] [float] NULL
) ON [PRIMARY]
GO
ALTER TABLE [app].[daily] ADD PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [app].[daily]  WITH CHECK ADD  CONSTRAINT [FK_DailyUser] FOREIGN KEY([UserID])
REFERENCES [app_sys].[user] ([UserID])
GO
ALTER TABLE [app].[daily] CHECK CONSTRAINT [FK_DailyUser]
GO
