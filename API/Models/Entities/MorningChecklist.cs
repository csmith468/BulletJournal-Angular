namespace API.Models.Entities {
    public class MorningChecklist {
        public int MorningChecklistID { get; set; }
        public int UserID { get; set; }
        public DateOnly Date { get; set; }
        public bool? GlassOfWater { get; set; }
        public bool? Meds { get; set; }
        public bool? Vitamins { get; set; }
        public bool? Breakfast { get; set; }
    }
}