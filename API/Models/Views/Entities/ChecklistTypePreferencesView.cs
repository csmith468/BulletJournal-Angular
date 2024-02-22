// Visible tables for each user with metadata joined in
// Source: app.v_visibleChecklist (app.checklistPreferences, app_sys.checklistType, where isVisible = 1)

namespace API.Models.Views.Entities {
    public class ChecklistTypePreferencesView {
        public int checklistTypePreferencesID { get; set; }
        public int userID { get; set; }
        public string key { get; set; }
        public string label { get; set; }
        public bool isVisible { get; set; }
        public string icon { get; set; }
        public string category { get; set; }
        public bool? isHeader { get; set; }
        public int defaultOrder { get; set; }
    }
}