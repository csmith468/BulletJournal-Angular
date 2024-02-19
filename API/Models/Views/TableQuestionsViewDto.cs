namespace API.Models.Views {
    public class TableQuestionsViewDto {
        public string tableName { get; set; }
        public string key { get; set; }
        public string label { get; set; }
        public int? questionOrder { get; set; }
    }
}