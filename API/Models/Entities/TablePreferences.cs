namespace API.Models.Entities {
    public class TablePreferences {
        public int tablePreferencesID { get; set; }
        public int userID { get; set; }
        public string tableName { get; set; }
        public bool? isVisible { get; set; }
    }
}