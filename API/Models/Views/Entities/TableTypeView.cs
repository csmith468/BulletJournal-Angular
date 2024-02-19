// Visible tables for each user with metadata joined in
// Source: app.v_tableType (app.tablePreferences, app_sys.tables, where isVisible = 1)

namespace API.Models.Views.Entities {
    public class TableTypeView {
        public int tablePreferencesID { get; set; }
        public int userID { get; set; }
        public string key { get; set; }
        public string label { get; set; }
        public string icon { get; set; }
        public string category { get; set; }
        public bool? isHeader { get; set; }
    }
}