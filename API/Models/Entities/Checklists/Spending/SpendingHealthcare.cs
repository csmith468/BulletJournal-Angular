namespace API.Models.Entities {
    public class SpendingHealthcare : Checklist {
        public int SpendingHealthcareID { get; set; }
        public override int UserID { get; set; }
        public override DateOnly Date { get; set; }
        public double? Medication { get; set; }
        public double? Doctor { get; set; }
        public double? Therapy { get; set; }
        public double? Psychiatrist { get; set; }
        public double? EyeDoctor { get; set; }
        public double? Dentist { get; set; }
        public double? Dermatologist { get; set; }
        public double? SleepDoctor { get; set; }
        public double? Gynecologist { get; set; }
        public double? ContactLenses { get; set; }
        public double? HealthInsurance { get; set; }
        public double? LifeInsurance { get; set; }
        public double? OtherInsurance { get; set; }

        public override int GetID() { return SpendingHealthcareID; }
    }
}