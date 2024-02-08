SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [app].[spendingHealthcare](
	[SpendingHealthcareID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [int] NOT NULL,
	[Date] [date] NOT NULL,
	[Medication] [float] NULL,
	[Doctor] [float] NULL,
	[Therapy] [float] NULL,
	[Psychiatrist] [float] NULL,
	[EyeDoctor] [float] NULL,
	[Dentist] [float] NULL,
	[Dermatologist] [float] NULL,
	[SleepDoctor] [float] NULL,
	[Gynecologist] [float] NULL,
	[ContactLenses] [float] NULL,
	[HealthInsurance] [float] NULL,
	[LifeInsurance] [float] NULL,
	[OtherInsurance] [float] NULL
) ON [PRIMARY]
GO
ALTER TABLE [app].[spendingHealthcare] ADD PRIMARY KEY CLUSTERED 
(
	[SpendingHealthcareID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [app].[spendingHealthcare]  WITH CHECK ADD  CONSTRAINT [FK_spendingHealthcare_User] FOREIGN KEY([UserID])
REFERENCES [app_sys].[user] ([UserID])
GO
ALTER TABLE [app].[spendingHealthcare] CHECK CONSTRAINT [FK_spendingHealthcare_User]
GO
