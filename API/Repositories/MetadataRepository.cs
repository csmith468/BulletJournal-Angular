
using API.Data.Interfaces;
using API.Models.DTOs;
using API.Models.Entities;
using API.Models.Views;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

// getting data about tables/questions for user but not data within them
namespace API.Data.Repositories {
    public class MetadataRepository : IMetadataRepository {
        // private readonly DataContextDapper _contextDapper;
        private readonly DataContextEF _contextEF;
        private readonly IMapper _mapper;
        public MetadataRepository(DataContextEF contextEF, IMapper mapper) {
            _contextEF = contextEF;
            _mapper = mapper;
        }

        public async Task<IEnumerable<QuestionSetDto>> GetQuestionSetAsync(int userId, string type) {
            var visibleQuestions = await _contextEF.QuestionPreferences
                .Where(p => p.userID == userId 
                    && p.tableName.ToLower() == type.ToLower() 
                    && p.isVisible == true
                ).ToListAsync();
            return visibleQuestions.Select(q => _mapper.Map<QuestionPreferences, QuestionSetDto>(q)).ToList();
        }

        public async Task<IEnumerable<string>> GetInvisibleTablesAsync(int userId) {
            return await _contextEF.TablePreferences
                .Where(t => t.userID == userId && t.isTableVisible == false)
                .Select(p => p.tableName)
                .ToListAsync();
        }

        public async Task<IEnumerable<ChartQuestionsView>> GetChartQuestionsAsync(int userId) {
            return await _contextEF.ChartQuestionsViews.Where(q => q.userID == userId).ToListAsync();
        }

        public async Task<IEnumerable<ChartQuestionsView>> GetChartQuestionsByTypeAsync(int userId, string type) {
            return await _contextEF.ChartQuestionsViews.Where(q => q.userID == userId && q.tableName == type).ToListAsync();
        }

        public async Task<IEnumerable<ChartQuestionsView>> GetChartQuestionsByKindIdAsync(int userId, int kindId) {
            return await _contextEF.ChartQuestionsViews.Where(q => q.userID == userId && q.questionKindID == kindId).ToListAsync();
        }

        public async Task<IEnumerable<ChartQuestionsView>> GetChartQuestionsByTypeAndKindIdAsync(int userId, string type, int kindId) {
            return await _contextEF.ChartQuestionsViews.Where(q => 
                q.userID == userId && q.tableName == type && q.questionKindID == kindId
            ).ToListAsync();
        }

        public async Task<IEnumerable<Tables>> GetTablesAsync() {
            return await _contextEF.Tables.OrderBy(x => x.displayName).ToListAsync();
        }
    }
}