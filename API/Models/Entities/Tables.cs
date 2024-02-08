namespace API.Models.Entities {
    public class Tables {
        public int TableID { get; set; }
        public string Key { get; set; }
        public string DisplayName { get; set; }
        public string Icon { get; set; }
        public string Category { get; set; }
        public bool? IsHeader { get; set; }
    }
}