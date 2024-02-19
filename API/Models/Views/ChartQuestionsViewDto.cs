namespace API.Models.Views {
    public class ChartQuestionsViewDto {
        public string tableName { get; set; }
        public string key { get; set; }
        public string label { get; set; }
        public int questionKindID { get; set; }
        public string kindBase { get; set; }
        public string kindDetail { get; set; }
        public int? questionOrder { get; set; }
    }
}