namespace API.Models.Entities {
    public class QuestionSet {
        public int QuestionID { get; set; }
        public string Source { get; set; }
        public string Key { get; set; }
        public string Type { get; set; }
        public string TypeDetail { get; set; }
        public string Question { get; set; }
        public string Options { get; set; }
        public int? MinValue { get; set; }
        public int? MaxValue { get; set; }
    }
}