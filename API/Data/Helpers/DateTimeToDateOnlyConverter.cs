using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace API.Data.Helpers {
    public class DateTimeToOnlyConverter : ValueConverter<DateOnly, DateTime> {
        public DateTimeToOnlyConverter() : base(
            dateOnly => dateOnly.ToDateTime(TimeOnly.MinValue), 
            dateTime => DateOnly.FromDateTime(dateTime))
        { }
    }
}