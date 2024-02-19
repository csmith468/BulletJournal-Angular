
using API.Data.Interfaces;
using API.Models.Tables.Entities;
using API.Models.Views.DTOs;
using API.Models.Views.Entities;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

// getting data about tables/questions for user but not data within them
namespace API.Data.Repositories
{
    public class MetadataRepository : IMetadataRepository {
        // private readonly DataContextDapper _contextDapper;
        private readonly DataContextEF _contextEF;
        private readonly IMapper _mapper;
        public MetadataRepository(DataContextEF contextEF, IMapper mapper) {
            _contextEF = contextEF;
            _mapper = mapper;
        }

        // Questions with Relevant Data for Each UI Page
        public async Task<IEnumerable<ChartQuestionViewDto>> GetChartQuestionsAsync(int userId, string type) {
            var questions = await _contextEF.QuestionsView.Where(q => q.userID == userId && q.tableName == type && q.includeInCharts == true).ToListAsync();
            return questions.Select(q => _mapper.Map<QuestionView, ChartQuestionViewDto>(q)).ToList();
        }

        public async Task<IEnumerable<ChartQuestionViewDto>> GetChartQuestionsByKindAsync(int userId, string type, int kindId) {
            var questions = await _contextEF.QuestionsView.Where(q => 
                q.userID == userId && q.tableName == type && q.questionKindID == kindId && q.includeInCharts == true
            ).ToListAsync();
            return questions.Select(q => _mapper.Map<QuestionView, ChartQuestionViewDto>(q)).ToList();
        }

        public async Task<IEnumerable<ChecklistQuestionViewDto>> GetChecklistQuestionsAsync(int userId, string type) {
            var questions = await _contextEF.QuestionsView.Where(q => q.userID == userId && q.tableName == type).ToListAsync();
            return questions.Select(q => _mapper.Map<QuestionView, ChecklistQuestionViewDto>(q)).ToList();
        }

        public async Task<IEnumerable<TableQuestionViewDto>> GetTableQuestionsAsync(int userId, string type) {
            var questions = await _contextEF.QuestionsView.Where(q => q.userID == userId && q.tableName == type).ToListAsync();
            return questions.Select(q => _mapper.Map<QuestionView, TableQuestionViewDto>(q)).ToList();
        }


        // Table Types with Relevant Data for Each UI Page
        public async Task<IEnumerable<TableTypeLayoutDto>> GetTableTypeLayoutAsync(int userID) {
            var tables = await _contextEF.TableTypeView.Where(t => t.userID == userID).OrderBy(t => t.key).ToListAsync();
            return tables.Select(q => _mapper.Map<TableTypeView, TableTypeLayoutDto>(q)).ToList();
        }
    }
}