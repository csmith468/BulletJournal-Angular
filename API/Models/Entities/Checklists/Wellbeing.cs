namespace API.Models.Entities {
    public class Wellbeing : Checklist {
        public int WellbeingID { get; set; }
        public override int UserID { get; set; }
        public override DateOnly Date { get; set; }
        public float? DayRating { get; set; }
        public float? Happiness { get; set; }
        public float? Sadness { get; set; }
        public float? Shame { get; set; }
        public float? Anger { get; set; }
        public float? Anxiety { get; set; }
        public float? Overwhelmed { get; set; }
        public float? Irritable { get; set; }
        public float? Energy { get; set; }
        public override int GetID() { return WellbeingID; }
    }
}