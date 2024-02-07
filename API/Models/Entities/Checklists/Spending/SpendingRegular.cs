namespace API.Models.Entities {
    public class SpendingRegular : Checklist {
        public int SpendingRegularID { get; set; }
        public override int UserID { get; set; }
        public override DateOnly Date { get; set; }
        public double? RentMortgage { get; set; }
        public double? Electricity { get; set; }
        public double? GasOil { get; set; }
        public double? Wifi { get; set; }
        public double? RentersInsurance { get; set; }
        public double? CarPayment { get; set; }
        public double? CarInsurance { get; set; }
        public double? Security { get; set; }
        public double? Garbage { get; set; }
        public double? Phone { get; set; }
        public double? Tuition { get; set; }

        public override int GetID() { return SpendingRegularID; }
    }
}