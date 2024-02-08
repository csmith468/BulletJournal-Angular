SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [app].[spendingFinancial](
	[SpendingFinancialID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [int] NOT NULL,
	[Date] [date] NOT NULL,
	[DebtPayments] [float] NULL,
	[Taxes] [float] NULL,
	[Donations] [float] NULL,
	[Investments] [float] NULL,
	[Savings] [float] NULL
) ON [PRIMARY]
GO
ALTER TABLE [app].[spendingFinancial] ADD PRIMARY KEY CLUSTERED 
(
	[SpendingFinancialID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [app].[spendingFinancial]  WITH CHECK ADD  CONSTRAINT [FK_spendingFinancial_User] FOREIGN KEY([UserID])
REFERENCES [app_sys].[user] ([UserID])
GO
ALTER TABLE [app].[spendingFinancial] CHECK CONSTRAINT [FK_spendingFinancial_User]
GO
