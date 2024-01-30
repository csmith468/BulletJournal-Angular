namespace API.Models.Entities {
    public class Wellbeing : Checklist {
        public int WellbeingID { get; set; }
        public override int UserID { get; set; }
        public override DateOnly Date { get; set; }
        public double? DayRating { get; set; }
        public double? Happiness { get; set; }
        public double? Sadness { get; set; }
        public double? Shame { get; set; }
        public double? Anger { get; set; }
        public double? Anxiety { get; set; }
        public double? Overwhelmed { get; set; }
        public double? Irritable { get; set; }
        public double? Energy { get; set; }
        public override int GetID() { return WellbeingID; }
    }
}