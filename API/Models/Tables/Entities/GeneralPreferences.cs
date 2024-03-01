namespace API.Models.Tables.Entities {
    public class GeneralPreferences : BaseEntity {
        public int generalPreferencesID { get; set; }
        public int userID { get; set; }
        public bool showUnsavedChangesGuard { get; set; }
        public bool showDeleteGuard { get; set; }
    }
}