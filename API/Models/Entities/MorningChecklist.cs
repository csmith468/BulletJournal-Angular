namespace API.Models.Entities {
    public class MorningChecklist {
        public int UserID { get; set; }
        public int MorningChecklistID { get; set; }
        public DateOnly Date { get; set; }
        public bool GlassOfWater { get; set; }
        public bool Meds { get; set; }
        public bool Vitamins { get; set; }
        public bool Breakfast { get; set; }
    }
}