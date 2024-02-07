SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [app].[spendingPersonal](
	[SpendingPersonalID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [int] NOT NULL,
	[Date] [date] NOT NULL,
	[Groceries] [float] NULL,
	[Gas] [float] NULL,
	[Gym] [float] NULL,
	[Subscriptions] [float] NULL,
	[EatingOut] [float] NULL,
	[Alcohol] [float] NULL,
	[Skincare] [float] NULL,
	[Makeup] [float] NULL,
	[HairCare] [float] NULL,
	[HairAppointments] [float] NULL,
	[Books] [float] NULL,
	[Activities] [float] NULL,
	[Sports] [float] NULL,
	[Clothes] [float] NULL,
	[DryCleaningLaundry] [float] NULL,
	[Rideshare] [float] NULL,
	[ParkingTolls] [float] NULL,
	[CarRepairs] [float] NULL,
	[Academic] [float] NULL,
	[Furniture] [float] NULL,
	[Pets] [float] NULL,
	[Hobbies] [float] NULL,
	[Travel] [float] NULL,
	[Gifts] [float] NULL,
	[ChildCare] [float] NULL,
	[MiscNonEssential] [float] NULL,
	[PlannedNonEssential] [float] NULL,
	[Essential] [float] NULL
) ON [PRIMARY]
GO
ALTER TABLE [app].[spendingPersonal] ADD PRIMARY KEY CLUSTERED 
(
	[SpendingPersonalID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
