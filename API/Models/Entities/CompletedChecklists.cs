namespace API.Models.Entities {
    public class CompletedChecklists {
        public string TableName { get; set; }
        public DateTime Date { get; set; }
        public bool IsCompleted { get; set; }
    }
}