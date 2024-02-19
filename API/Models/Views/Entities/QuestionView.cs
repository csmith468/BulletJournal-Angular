// Visible questions for each user with metadata joined in
// Source: app.v_question (app.questionPreferences, app_sys.questionKinds, where isVisible = 1)

namespace API.Models.Views.Entities {
    public class QuestionView {
        public int questionPreferencesId { get; set; }
        public int userID { get; set; }
        public string tableName { get; set; }
        public string key { get; set; }
        public string label { get; set; }
        public bool includeInCharts { get; set; }
        public int questionKindID { get; set; }
        public string kindBase { get; set; }
        public string kindDetail { get; set; }
        public int? questionOrder { get; set; }
        public int? minValue { get; set; }
        public int? maxValue { get; set; }
    }
}