namespace API.Models.Entities {
    public class Night : Checklist {
        public int NightID { get; set; }
        public override int UserID { get; set; }
        public override DateOnly Date { get; set; }
        public bool? GlassOfWater { get; set; }
        public bool? Meds { get; set; }
        public bool? Vitamins { get; set; }
        public bool? WashFace { get; set; }
        public bool? Floss { get; set; }
        public bool? Retainer { get; set; }
        public override int GetID() { return NightID; }
    }
}