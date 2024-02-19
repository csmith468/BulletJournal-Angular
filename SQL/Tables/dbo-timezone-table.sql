SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[timezone](
	[timezoneID] [int] IDENTITY(1,1) NOT NULL,
	[timezoneCode] [nvarchar](100) NULL,
	[timezoneName] [nvarchar](255) NULL,
	[standardBias] [int] NULL,
	[UTCOffset] [float] NULL,
	[timezoneBiasID] [int] NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[timezone] ADD PRIMARY KEY CLUSTERED 
(
	[timezoneID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[timezone]  WITH CHECK ADD  CONSTRAINT [FK_tz_tzbias] FOREIGN KEY([timezoneBiasID])
REFERENCES [dbo].[timezoneBias] ([timezoneBiasID])
GO
ALTER TABLE [dbo].[timezone] CHECK CONSTRAINT [FK_tz_tzbias]
GO
