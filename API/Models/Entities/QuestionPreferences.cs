namespace API.Models.Entities {
    public class QuestionPreferences {
        public int QuestionPreferencesID { get; set; }
        public int UserID { get; set; }
        public string TableName { get; set; }
        public string ColumnName { get; set; }
        public bool? IsColumnVisible { get; set; }
    }
}