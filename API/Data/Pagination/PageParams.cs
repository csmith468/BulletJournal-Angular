using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace API.Data.Pagination {
    public class PageParams {
        private const int MaxPageSize = 100;
        public int PageNumber { get; set; } = 1;
        private int _pageSize = 5;
        // if the user requests more than 100 records, only return 100 
        public int PageSize {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }
    }
}