namespace API.Models.Entities {
    public class Morning : Checklist {
        public int MorningID { get; set; }
        public override int UserID { get; set; }
        public override DateOnly Date { get; set; }
        public bool? GlassOfWater { get; set; }
        public bool? Meds { get; set; }
        public bool? Vitamins { get; set; }
        public bool? Breakfast { get; set; }
        public override int GetID() { return MorningID; }
    }
}