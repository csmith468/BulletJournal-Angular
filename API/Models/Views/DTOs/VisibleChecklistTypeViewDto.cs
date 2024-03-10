// Visible checklist types for each user with metadata joined in
// Source: app.v_checklistType (app.checklistTypePreferences, app_sys.checklistTypes, where isVisible = 1)
// This data is exactly what is needed for sidenav

namespace API.Models.Views.DTOs {
    public class VisibleChecklistTypeViewDto {
        public string key { get; set; }
        public string label { get; set; }
        public string icon { get; set; }
        public string category { get; set; }
        public bool? isHeader { get; set; }
        public bool includeInCharts { get; set; }
        public bool canUpdateQuestions { get; set; }
    }
}