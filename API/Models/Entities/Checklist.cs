namespace API.Models.Entities {
    public interface IChecklist {
        int UserID { get; set; }
        DateOnly Date { get; set; }
        // int GetID();
    }

    public abstract class Checklist : IChecklist {
        public abstract int UserID { get; set; }
        public abstract DateOnly Date { get; set; }
        // public abstract int GetID();
    }
}

