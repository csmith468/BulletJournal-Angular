namespace API.Models.DTOs
{
    public class NightChecklistDto {
        public DateOnly Date { get; set; }
        public bool? GlassOfWater { get; set; }
        public bool? Meds { get; set; }
        public bool? Vitamins { get; set; }
        public bool? WashFace { get; set; }
        public bool? Floss { get; set; }
        public bool? CheckEmails { get; set; }
        public bool? CheckTexts { get; set; }
        public bool? Mouthguard { get; set; }
        public bool? Fruits { get; set; }
        public bool? Vegetables { get; set; }
        public bool? Read { get; set; }
        public bool? WentOutside { get; set; }

    }
}