namespace API.Models.Entities {
    public class NightChecklist {
        public int NightChecklistID { get; set; }
        public int UserID { get; set; }
        public DateOnly Date { get; set; }
        public bool GlassOfWater { get; set; }
        public bool Meds { get; set; }
        public bool Vitamins { get; set; }
        public bool WashFace { get; set; }
        public bool Floss { get; set; }
        public bool CheckEmails { get; set; }
        public bool CheckTexts { get; set; }
        public bool Mouthguard { get; set; }
        public DateTime ModifiedDatetime { get; set; } = DateTime.UtcNow;
    }
}