namespace API.Models.DTOs
{
    public class MorningChecklistDto {
        public DateOnly Date { get; set; }
        public bool? GlassOfWater { get; set; }
        public bool? Meds { get; set; }
        public bool? Vitamins { get; set; }
        public bool? Breakfast { get; set; }

    }
}