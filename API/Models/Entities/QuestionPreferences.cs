namespace API.Models.Entities {
    public class QuestionPreferences {
        public int questionPreferencesID { get; set; }
        public int userID { get; set; }
        public string tableName { get; set; }
        public string key { get; set; }
        public int? keyNumber { get; set; }
        public string label { get; set; }
        public int questionKindID { get; set; }
        public int standardQuestionID { get; set; }
        public bool isVisible { get; set; }
        public int? questionOrder { get; set; }
        public int? minValue { get; set; }
        public int? maxValue { get; set; }
    }
}