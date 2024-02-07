namespace API.Models.Entities {
    public class SpendingFinancial : Checklist {
        public int SpendingFinancialID { get; set; }
        public override int UserID { get; set; }
        public override DateOnly Date { get; set; }
        public double? DebtPayments { get; set; }
        public double? Taxes { get; set; }
        public double? Donations { get; set; }
        public double? Investments { get; set; }
        public double? Savings { get; set; }

        public override int GetID() { return SpendingFinancialID; }
    }
}