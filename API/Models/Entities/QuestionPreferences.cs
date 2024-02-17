namespace API.Models.Entities {
    public class QuestionPreferences {
        public int QuestionPreferencesID { get; set; }
        public int UserID { get; set; }
        public string TableName { get; set; }
        public string Key { get; set; }
        public int? QuestionNumber { get; set; }
        public string Label { get; set; }
        public bool IsQuestionVisible { get; set; }
        public int? QuestionOrder { get; set; }
        public string Type { get; set; }
        public string TypeDetail { get; set; }
        public int? MinValue { get; set; }
        public int? MaxValue { get; set; }
    }
}