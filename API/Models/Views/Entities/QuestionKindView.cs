namespace API.Models.Views.Entities {
    public class QuestionKindView {
        public int questionKindID { get; set; }
        public string kindBase { get; set; }
        public string kindDetail { get; set; }
        public bool includeInCharts { get; set; }
        public bool? isPercentage { get; set; }
        public bool? isCurrency { get; set; }
        public int? minValue { get; set; }
        public int? maxValue { get; set; }
        public int? minDecimalPlacesYAxis { get; set; }
        public int? maxDecimalPlacesYAxis { get; set; }
        public int? minDecimalPlacesYLabel { get; set; }
        public int? maxDecimalPlacesYLabel { get; set; }
    }
}