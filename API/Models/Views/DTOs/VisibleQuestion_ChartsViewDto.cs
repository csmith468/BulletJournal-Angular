// Visible questions for each user with metadata joined in
// Source: app.v_question (app.questionPreferences, app_sys.questionKinds, where isVisible = 1)
// This data is exactly what is needed for chart visualizations ("Trends" page)

namespace API.Models.Views.DTOs {
    public class VisibleQuestion_ChartsViewDto {
        public string checklistTypeName { get; set; }
        public string key { get; set; }
        public string label { get; set; }
        public int questionKindID { get; set; }
        public string kindBase { get; set; }
        public string kindDetail { get; set; }
        public int? questionOrder { get; set; }
    }
}