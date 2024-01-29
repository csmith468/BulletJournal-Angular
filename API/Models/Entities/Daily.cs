namespace API.Models.Entities {
    public class Daily : Checklist {
        public int DailyID { get; set; }
        public override int UserID { get; set; }
        public override DateOnly Date { get; set; }
        public bool? Breakfast { get; set; }
        public bool? Lunch { get; set; }
        public bool? Dinner { get; set; }
        public bool? Fruits { get; set; }
        public bool? Vegetables { get; set; }
        public bool? Read { get; set; }
        public bool? WentOutside { get; set; }
        public bool? Showered { get; set; }
        public bool? Journaled { get; set; }
        public bool? Meditated { get; set; }
        public bool? CheckEmails { get; set; }
        public bool? CheckTexts { get; set; }
        public bool? CommitmentsMet { get; set; }
        public int? Steps { get; set; }
        public float? Spending { get; set; }
        public float? ScreenTime { get; set; }
        public int? HoursWorked { get; set; }

        public override int GetID() { return DailyID; }
    }
}