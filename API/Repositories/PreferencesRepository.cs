using API.Data.Interfaces;
using API.Models.Entities;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Repositories
{
    public class PreferencesRepository : IPreferencesRepository {
        private readonly DataContextDapper _contextDapper;
        private readonly DataContextEF _contextEF;
        private readonly IMapper _mapper;
        public PreferencesRepository(DataContextEF contextEF, IMapper mapper, DataContextDapper contextDapper) {
            _contextEF = contextEF;
            _mapper = mapper;
            _contextDapper = contextDapper;
        }

        public async Task<IEnumerable<QuestionPreferences>> GetQuestionPreferencesAsync(int userId) {
            return await _contextEF.QuestionPreferences   
                .Where(x => x.userID == userId)
                .OrderBy(x => x.tableName)
                .ToListAsync();
        }

        public async Task<IEnumerable<QuestionPreferences>> GetQuestionPreferencesByTypeAsync(int userId, string type) {
            return await _contextEF.QuestionPreferences   
                .Where(x => x.userID == userId && x.tableName == type)
                .OrderBy(x => x.tableName)
                .ToListAsync();
        }

        public async Task<QuestionPreferences> GetQuestionPreferencesByIdAsync(int userId, int id) {
            return await _contextEF.QuestionPreferences   
                .Where(x => x.userID == userId && x.questionPreferencesID == id)
                .SingleOrDefaultAsync();
        }


        public async Task<IEnumerable<TablePreferences>> GetTablePreferencesAsync(int userId) {
            return await _contextEF.TablePreferences   
                .Where(x => x.userID == userId)
                .OrderBy(x => x.key)
                .ToListAsync();
        }

        public async Task<IEnumerable<TablePreferences>> GetTablePreferencesByTypeAsync(int userId, string type) {
            return await _contextEF.TablePreferences   
                .Where(x => x.userID == userId)
                .OrderBy(x => x.key)
                .ToListAsync();
        }

        public async Task<TablePreferences> GetTablePreferencesByIdAsync(int userId, int id) {
            return await _contextEF.TablePreferences   
                .Where(x => x.userID == userId && x.tablePreferencesID == id)
                .SingleOrDefaultAsync();
        }


        public async Task<bool> CreateTablePreferencesAsync(int userId) {
            string sql = @"INSERT INTO [app_sys].[tablePreferences]
                            SELECT " + userId.ToString()
                                + @" AS [userID]
                                ,[tableName]
                                ,1 AS [isVisible]
                            FROM [dbo].[tablePreferencesSetup]
                        ";
            return await _contextDapper.ExecuteAsync(sql);
        }

        public async Task<bool> CreateQuestionPreferencesAsync(int userId) {
            string sql = @"INSERT INTO [app_sys].[questionPreferences]
                            SELECT " + userId.ToString()
                                + @" AS [userID]
                                ,[tableName]
                                ,[columnName]
                                ,1 AS [isColumnVisible]
                            FROM [dbo].[questionPreferencesSetup]
                        ";
            return await _contextDapper.ExecuteAsync(sql);
        }

    }
}