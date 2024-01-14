using System.Text.Json;

namespace API.Data.Pagination {
    public static class HttpExtensions {
        public static void AddPaginationHeader(this HttpResponse response, PaginationHeader header) {
            // specify to use camel case
            var jsonOptions = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};
            // add pagination header
            response.Headers.Add("Pagination", JsonSerializer.Serialize(header, jsonOptions));
            // allow custom header to be used in client (CORS)
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }
    }
}