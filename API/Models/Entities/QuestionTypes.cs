namespace API.Models.Entities {
    public class QuestionTypes {
        public int QuestionTypeID { get; set; }
        public string TypeDetail { get; set; }
        public string Type { get; set; }
        public int? MinValue { get; set; }
        public int? MaxValue { get; set; }
    }
}