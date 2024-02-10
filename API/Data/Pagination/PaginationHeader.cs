namespace API.Data.Pagination {
    public class PaginationHeader {
        public PaginationHeader(int currentPage, int itemsPerPage, int totalItems, int totalPages,
            DateOnly? minDate, DateOnly? maxDate, DateOnly? minDateInRange, DateOnly? maxDateInRange) {
            CurrentPage = currentPage;
            ItemsPerPage = itemsPerPage;
            TotalItems = totalItems;
            TotalPages = totalPages;
            MinDate = minDate;
            MaxDate = maxDate;
            MinDateInRange = minDateInRange;
            MaxDateInRange = maxDateInRange;
        }

        public int CurrentPage { get; set; }
        public int ItemsPerPage { get; set; }
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }
        public DateOnly? MinDate { get; set; }
        public DateOnly? MaxDate { get; set; }
        public DateOnly? MinDateInRange { get; set; }
        public DateOnly? MaxDateInRange { get; set; }
    }
}