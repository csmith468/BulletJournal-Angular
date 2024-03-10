namespace API.Models.Tables.Entities {
    public class ChecklistTypePreferences : BaseEntity {
        public int checklistTypePreferencesID { get; set; }
        public int userID { get; set; }
        public int checklistTypeID { get; set; }
        public bool? isVisible { get; set; }
        public bool? canUpdateQuestions { get; set; }
    }
}