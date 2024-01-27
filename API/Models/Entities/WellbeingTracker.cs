namespace API.Models.Entities {
    public class WellbeingTracker {
        public int WellbeingTrackerID { get; set; }
        public int UserID { get; set; }
        public DateOnly Date { get; set; }
        public int? DayRating { get; set; }
        public float? Happiness { get; set; }
        public float? Sadness { get; set; }
        public float? Shame { get; set; }
        public float? Anger { get; set; }
        public float? Anxiety { get; set; }
        public float? Overwhelmed { get; set; }
        public float? Irritable { get; set; }
        public float? Energy { get; set; }
    }
}