using API.Data.Interfaces;
using API.Models.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Repositories
{
    public class SettingsRepository : ISettingsRepository {
        private readonly DataContextDapper _contextDapper;
        private readonly DataContextEF _contextEF;
        private readonly IMapper _mapper;
        public SettingsRepository(DataContextEF contextEF, IMapper mapper, DataContextDapper contextDapper) {
            _contextEF = contextEF;
            _mapper = mapper;
            _contextDapper = contextDapper;
        }

        public async Task<IEnumerable<QuestionPreferences>> GetQuestionPreferencesAsync(int userId) {
            return await _contextEF.QuestionPreferences   
                .Where(x => x.UserID == userId)
                .OrderBy(x => x.TableName)
                .ToListAsync();
        }

        public async Task<IEnumerable<QuestionPreferences>> GetQuestionPreferencesByTypeAsync(int userId, string type) {
            return await _contextEF.QuestionPreferences   
                .Where(x => x.UserID == userId && x.TableName == type)
                .OrderBy(x => x.TableName)
                .ToListAsync();
        }

        public async Task<QuestionPreferences> GetQuestionPreferencesByIdAsync(int userId, int id) {
            return await _contextEF.QuestionPreferences   
                .Where(x => x.UserID == userId && x.QuestionPreferencesID == id)
                .SingleOrDefaultAsync();
        }


        public async Task<IEnumerable<TablePreferences>> GetTablePreferencesAsync(int userId) {
            return await _contextEF.TablePreferences   
                .Where(x => x.UserID == userId)
                .OrderBy(x => x.TableName)
                .ToListAsync();
        }

        public async Task<IEnumerable<TablePreferences>> GetTablePreferencesByTypeAsync(int userId, string type) {
            return await _contextEF.TablePreferences   
                .Where(x => x.UserID == userId)
                .OrderBy(x => x.TableName)
                .ToListAsync();
        }

        public async Task<TablePreferences> GetTablePreferencesByIdAsync(int userId, int id) {
            return await _contextEF.TablePreferences   
                .Where(x => x.UserID == userId && x.TablePreferencesID == id)
                .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<Tables>> GetTablesAsync() {
            return await _contextEF.Tables.OrderBy(x => x.DisplayName).ToListAsync();
        }

        public async Task<IEnumerable<string>> GetInvisibleTablesAsync(int userId) {
            return await _contextEF.TablePreferences
                .Where(t => t.UserID == userId && t.IsTableVisible == false)
                .Select(p => p.TableName)
                .ToListAsync();
        }

        public async Task<bool> CreateTablePreferencesAsync(int userId) {
            string sql = @"INSERT INTO [app_sys].[tablePreferences]
                            SELECT " + userId.ToString()
                                + @" AS [UserID]
                                ,[TableName]
                                ,1 AS [IsTableVisible]
                            FROM [dbo].[tablePreferencesSetup]
                        ";
            return await _contextDapper.ExecuteAsync(sql);
        }

        public async Task<bool> CreateQuestionPreferencesAsync(int userId) {
            string sql = @"INSERT INTO [app_sys].[questionPreferences]
                            SELECT " + userId.ToString()
                                + @" AS [UserID]
                                ,[TableName]
                                ,[ColumnName]
                                ,1 AS [IsColumnVisible]
                            FROM [dbo].[questionPreferencesSetup]
                        ";
            return await _contextDapper.ExecuteAsync(sql);
        }

    }
}