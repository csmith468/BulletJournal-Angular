namespace API.Models.Tables.Entities {
    public class TableType {
        public int tableID { get; set; }
        public string key { get; set; }
        public string label { get; set; }
        public string icon { get; set; }
        public string category { get; set; }
        public bool? isHeader { get; set; }
    }
}