SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [app].[spendingRegular](
	[SpendingRegularID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [int] NOT NULL,
	[Date] [date] NOT NULL,
	[RentMortgage] [float] NULL,
	[Electricity] [float] NULL,
	[GasOil] [float] NULL,
	[Wifi] [float] NULL,
	[RentersInsurance] [float] NULL,
	[CarPayment] [float] NULL,
	[CarInsurance] [float] NULL,
	[Security] [float] NULL,
	[Garbage] [float] NULL,
	[Phone] [float] NULL,
	[Tuition] [float] NULL
) ON [PRIMARY]
GO
ALTER TABLE [app].[spendingRegular] ADD PRIMARY KEY CLUSTERED 
(
	[SpendingRegularID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [app].[spendingRegular]  WITH CHECK ADD  CONSTRAINT [FK_spendingRegular_User] FOREIGN KEY([UserID])
REFERENCES [app].[user] ([UserID])
GO
ALTER TABLE [app].[spendingRegular] CHECK CONSTRAINT [FK_spendingRegular_User]
GO
