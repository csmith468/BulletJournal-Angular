namespace API.Models.Entities {
    public class QuestionPreferences {
        public int questionPreferencesID { get; set; }
        public int userID { get; set; }
        public string tableName { get; set; }
        public string key { get; set; }
        public int? questionNumber { get; set; }
        public string label { get; set; }
        public bool isQuestionVisible { get; set; }
        public int? questionOrder { get; set; }
        public string baseType { get; set; }
        public string typeDetail { get; set; }
        public int? minValue { get; set; }
        public int? maxValue { get; set; }
    }
}