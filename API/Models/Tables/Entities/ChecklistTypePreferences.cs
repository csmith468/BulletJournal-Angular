namespace API.Models.Tables.Entities {
    public class ChecklistTypePreferences : BaseEntity {
        public int checklistTypePreferencesID { get; set; }
        public int userID { get; set; }
        public string key { get; set; }
        public string label { get; set; }
        public bool? isVisible { get; set; }
    }
}