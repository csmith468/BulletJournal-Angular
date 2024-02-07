namespace API.Models.Entities {
    public class SpendingPersonal : Checklist {
        public int SpendingPersonalID { get; set; }
        public override int UserID { get; set; }
        public override DateOnly Date { get; set; }
        public double? Groceries { get; set; }
        public double? Gas { get; set; }
        public double? Gym { get; set; }
        public double? Subscriptions { get; set; }
        public double? EatingOut { get; set; }
        public double? Alcohol { get; set; }
        public double? Skincare { get; set; }
        public double? Makeup { get; set; }
        public double? HairCare { get; set; }
        public double? HairAppointments { get; set; }
        public double? Books { get; set; }
        public double? Activities { get; set; }
        public double? Sports { get; set; }
        public double? Clothes { get; set; }
        public double? DryCleaningLaundry { get; set; }
        public double? Rideshare { get; set; }
        public double? ParkingTolls { get; set; }
        public double? CarRepairs { get; set; }
        public double? Academic { get; set; }
        public double? Furniture { get; set; }
        public double? Pets { get; set; }
        public double? Hobbies { get; set; }
        public double? Travel { get; set; }
        public double? Gifts { get; set; }
        public double? ChildCare { get; set; }
        public double? MiscNonEssential { get; set; }
        public double? PlannedNonEssential { get; set; }
        public double? Essential { get; set; }

        public override int GetID() { return SpendingPersonalID; }
    }
}