namespace API.Models.Entities {
    public class TablePreferences {
        public int TablePreferencesID { get; set; }
        public int UserID { get; set; }
        public string TableName { get; set; }
        public bool? IsTableVisible { get; set; }
    }
}