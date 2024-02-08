using API.Data.Interfaces;
using API.Models.Entities;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace API.Data.Repositories {
    public class SettingsRepository : ISettingsRepository {
        // private readonly DataContextDapper _contextDapper;
        private readonly DataContextEF _contextEF;
        private readonly IMapper _mapper;
        public SettingsRepository(DataContextEF contextEF, IMapper mapper) {
            _contextEF = contextEF;
            _mapper = mapper;
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
            return await _contextEF.Tables.ToListAsync();
        }

        public async Task<IEnumerable<string>> GetInvisibleTablesAsync(int userId) {
            return await _contextEF.TablePreferences
                .Where(t => t.UserID == userId && t.IsTableVisible == false)
                .Select(p => p.TableName)
                .ToListAsync();
        }

    }
}