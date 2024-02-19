namespace API.Models.Views {
    public class ChecklistQuestionsView {
        public int questionPreferencesId { get; set; }
        public int userID { get; set; }
        public string tableName { get; set; }
        public string key { get; set; }
        public string label { get; set; }
        public int questionKindID { get; set; }
        public string kindBase { get; set; }
        public string kindDetail { get; set; }
        public int? questionOrder { get; set; }
        public int? minValue { get; set; }
        public int? maxValue { get; set; }
    }
}