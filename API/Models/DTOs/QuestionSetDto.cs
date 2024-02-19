namespace API.Models.DTOs {
    public class QuestionSetDto {
        public string tableName { get; set; }   // Source
        public string key { get; set; }  // Key 
        public string label { get; set; } // Question
        public int questionOrder { get; set; }
        public string kindBase { get; set; }
        public string kindDetail { get; set; }
        public int? minValue { get; set; }
        public int? maxValue { get; set; }
    }
}