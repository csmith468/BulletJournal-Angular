// Visible questions for each user with metadata joined in
// Source: app.v_visibleQuestion (app.questionPreferences, app_sys.questionKind, where isVisible = 1)

namespace API.Models.Views.Entities {
    public class QuestionPreferencesView {
        public int questionPreferencesID { get; set; }
        public int userID { get; set; }
        public string checklistTypeName { get; set; }
        public string key { get; set; }
        public string label { get; set; }
        public bool isVisible { get; set; }
        public bool includeInCharts { get; set; }
        public int questionKindID { get; set; }
        public string kindBase { get; set; }
        public string kindDetail { get; set; }
        public int? questionOrder { get; set; }
        public int? minValue { get; set; }
        public int? maxValue { get; set; }
    }
}