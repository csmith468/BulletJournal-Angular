SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [app_sys].[questionKind](
	[questionKindID] [int] IDENTITY(1,1) NOT NULL,
	[kindBase] [nvarchar](100) NOT NULL,
	[kindDetail] [nvarchar](100) NOT NULL,
	[includeInCharts] [bit] NOT NULL,
	[isPercentage] [bit] NULL,
	[isCurrency] [bit] NULL,
	[minValue] [int] NULL,
	[maxValue] [int] NULL,
	[minDecimalPlacesYAxis] [int] NULL,
	[maxDecimalPlacesYAxis] [int] NULL,
	[minDecimalPlacesYLabel] [int] NULL,
	[maxDecimalPlacesYLabel] [int] NULL
) ON [PRIMARY]
GO
ALTER TABLE [app_sys].[questionKind] ADD PRIMARY KEY CLUSTERED 
(
	[questionKindID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
