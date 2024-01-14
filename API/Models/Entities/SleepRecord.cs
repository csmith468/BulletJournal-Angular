namespace API.Models.Entities {
    public class SleepRecord {
        public int SleepID { get; set; }
        public int UserID { get; set; }
        public DateTime BedStartInstant { get; set; }
        public DateTime SleepStartInstant { get; set; }
        public DateTime SleepFinishInstant { get; set; }
        public DateTime BedFinishInstant { get; set; }
        public bool BedOnTime { get; set; }
        public bool WakeOnTime { get; set; }
        public int EnergyLevel { get; set; }
        public string Type { get; set; }
        public string Notes { get; set; }
        public DateTime ModifiedDatetime { get; set; } = DateTime.UtcNow;
    }
}