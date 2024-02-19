namespace API.Models.Entities {
    public class TablePreferences {
        public int tablePreferencesID { get; set; }
        public int userID { get; set; }
        public string key { get; set; }
        public string label { get; set; }
        public bool? isVisible { get; set; }
    }
}