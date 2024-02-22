namespace API.Models.Views.Entities {
    public class ChecklistTypeView {
        public int checklistTypeID { get; set; }
        public string key { get; set; }
        public string label { get; set; }
        public string icon { get; set; }
        public string category { get; set; }
        public bool? isHeader { get; set; }
        public int defaultOrder { get; set; }
    }
}