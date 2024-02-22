namespace API.Models.Tables.Entities {
    public class QuestionPreferences : BaseEntity {
        public int questionPreferencesID { get; set; }
        public int userID { get; set; }
        public int checklistTypeID { get; set; }
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