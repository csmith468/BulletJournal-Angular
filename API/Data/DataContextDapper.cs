using System.Data;
using Dapper;
using Microsoft.Data.SqlClient;

namespace API.Data {
    public class DataContextDapper {
        private readonly IConfiguration _config;
        private readonly IDbConnection _dbConnection;

        public DataContextDapper(IConfiguration config) {
            _config = config;
            _dbConnection = new SqlConnection(
                config.GetConnectionString("DefaultConnection")
            );
        }
    }
}