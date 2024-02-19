namespace API.Models.DTOs {
    public class QuestionSetDto {
        public string tableName { get; set; }   // Source
        public string key { get; set; }  // Key 
        public string label { get; set; } // Question
        public int questionOrder { get; set; }
        public string baseType { get; set; }
        public string typeDetail { get; set; }
        public int? minValue { get; set; }
        public int? maxValue { get; set; }
    }
}