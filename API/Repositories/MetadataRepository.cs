
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

        public async Task<IEnumerable<string>> GetInvisibleTablesAsync(int userId) {
            return await _contextEF.TablePreferences
                .Where(t => t.userID == userId && t.isVisible == false)
                .Select(p => p.key)
                .ToListAsync();
        }

        public async Task<IEnumerable<Tables>> GetTablesAsync() {
            return await _contextEF.Tables.OrderBy(x => x.displayName).ToListAsync();
        }

        // Chart Questions
        public async Task<IEnumerable<ChartQuestionsViewDto>> GetChartQuestionsAsync(int userId, string type) {
            var questions = await _contextEF.ChartQuestionsView.Where(q => q.userID == userId && q.tableName == type).ToListAsync();
            return questions.Select(q => _mapper.Map<ChartQuestionsView, ChartQuestionsViewDto>(q)).ToList();
        }

        public async Task<IEnumerable<ChartQuestionsViewDto>> GetChartQuestionsByKindAsync(int userId, string type, int kindId) {
            var questions = await _contextEF.ChartQuestionsView.Where(q => 
                q.userID == userId && q.tableName == type && q.questionKindID == kindId
            ).ToListAsync();
            return questions.Select(q => _mapper.Map<ChartQuestionsView, ChartQuestionsViewDto>(q)).ToList();
        }

        // Checklist Questions
        public async Task<IEnumerable<ChecklistQuestionsViewDto>> GetChecklistQuestionsAsync(int userId, string type) {
            var questions = await _contextEF.ChecklistQuestionsView.Where(q => q.userID == userId && q.tableName == type).ToListAsync();
            return questions.Select(q => _mapper.Map<ChecklistQuestionsView, ChecklistQuestionsViewDto>(q)).ToList();
        }
    }
}