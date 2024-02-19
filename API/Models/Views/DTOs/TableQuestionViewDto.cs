// Visible questions for each user with metadata joined in
// Source: app.questionPreferences, app_sys.questionKinds, where isVisible = 1
// This data is exactly what is needed for table visualization ("Data" page)

namespace API.Models.Views.DTOs {
    public class TableQuestionViewDto {
        public string tableName { get; set; }
        public string key { get; set; }
        public string label { get; set; }
        public int? questionOrder { get; set; }
    }
}