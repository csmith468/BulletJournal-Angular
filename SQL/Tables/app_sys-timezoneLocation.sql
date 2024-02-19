SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [app_sys].[timezoneLocation](
	[timezoneLocationID] [int] IDENTITY(1,1) NOT NULL,
	[timezoneLocation] [nvarchar](100) NULL,
	[timezoneID] [int] NOT NULL,
	[baseLocation] [nvarchar](100) NULL
) ON [PRIMARY]
GO
ALTER TABLE [app_sys].[timezoneLocation] ADD PRIMARY KEY CLUSTERED 
(
	[timezoneLocationID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [app_sys].[timezoneLocation]  WITH CHECK ADD  CONSTRAINT [FK_tzloc_tz] FOREIGN KEY([timezoneID])
REFERENCES [app_sys].[timezone] ([timezoneID])
GO
ALTER TABLE [app_sys].[timezoneLocation] CHECK CONSTRAINT [FK_tzloc_tz]
GO
