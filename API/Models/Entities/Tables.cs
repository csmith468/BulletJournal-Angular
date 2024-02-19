namespace API.Models.Entities {
    public class Tables {
        public int tableID { get; set; }
        public string key { get; set; }
        public string displayName { get; set; }
        public string icon { get; set; }
        public string category { get; set; }
        public bool? isHeader { get; set; }
    }
}