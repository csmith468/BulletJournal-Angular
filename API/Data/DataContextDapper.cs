using System.Data;
using Dapper;
using Microsoft.Data.SqlClient;

namespace API.Data {
    public class DataContextDapper {
        private readonly IDbConnection _dbConnection;

        public DataContextDapper(IDbConnection dbConnection) {
            _dbConnection = dbConnection;
        }

        public async Task<bool> ExecuteAsync(string sql) {
            return await _dbConnection.ExecuteAsync(sql) > 0;
        }
    }
}