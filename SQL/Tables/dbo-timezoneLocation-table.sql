SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[timezoneLocation](
	[TimezoneLocationID] [int] NOT NULL,
	[TimezoneLocation] [nvarchar](100) NULL,
	[TimezoneID] [int] NOT NULL,
	[BaseLocation] [nvarchar](100) NULL
) ON [PRIMARY]
GO
