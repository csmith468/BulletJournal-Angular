// Visible tables for each user with metadata joined in
// Source: app.v_tableType (app.tablePreferences, app_sys.tables, where isVisible = 1)
// This data is exactly what is needed for sidenav

namespace API.Models.Views.DTOs {
    public class TableTypeLayoutDto {
        public string key { get; set; }
        public string label { get; set; }
        public string icon { get; set; }
        public string category { get; set; }
        public bool? isHeader { get; set; }
    }
}