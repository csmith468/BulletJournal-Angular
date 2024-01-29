namespace API.Models.Entities {
    public class Physical : Checklist {
        public int PhysicalID { get; set; }
        public override int UserID { get; set; }
        public override DateOnly Date { get; set; }
        public int? PainLevel { get; set; }
        public bool? Headache { get; set; }
        public bool? Nausea { get; set; }
        public bool? StomachAche { get; set; }
        public bool? SoreThroat { get; set; }
        public bool? Cough { get; set; }
        public bool? Congestion { get; set; }
        public bool? NightSweats { get; set; }
        public bool? BackPain { get; set; }
        public bool? JawPain { get; set; }
        public bool? KneePain { get; set; }
        public bool? NoseBleed { get; set; }
        public bool? PeriodCramps { get; set; }
        public bool? Hangover { get; set; }
        public bool? MuscleSoreness { get; set; }
        public override int GetID() { return PhysicalID; }

    }
}