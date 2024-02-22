
using API.Data.Interfaces;
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

        public async Task<IEnumerable<QuestionPreferencesView>> GetVisibleQuestionsAsync(int userId, string type, bool chartQuestions, int? kindId) {
            var query = _contextEF.QuestionPreferencesView.AsQueryable();
            query = query.Where(q => q.userID == userId && q.checklistTypeName == type && q.isVisible == true);

            if (chartQuestions) query = query.Where(q => q.includeInCharts);

            if (kindId != null) query = query.Where(q => q.questionKindID == kindId);

            // var questions =  await _contextEF.QuestionPreferencesView.Where(q => 
            //     q.userID == userId 
            //     && q.checklistTypeName == type 
            //     && q.isVisible == true
            // ).ToListAsync();

            var questions = await query.ToListAsync();

            return questions;
        }

        // public async Task<IEnumerable<QuestionPreferencesView>> GetVisibleQuestionsByKindAsync(int userId, string type, int kindId, bool chartQuestions) {
        //     return await _contextEF.QuestionPreferencesView.Where(q => 
        //         q.userID == userId 
        //         && q.checklistTypeName == type 
        //         && q.isVisible == true
        //         && q.includeInCharts == chartQuestions
        //         && q.questionKindID == kindId
        //     ).ToListAsync();
        // }


        // Table Types with Relevant Data for Each UI Page
        public async Task<IEnumerable<ChecklistTypePreferencesView>> GetVisibleChecklistTypeAsync(int userID) {
            return await _contextEF.ChecklistTypePreferencesView
                .Where(t => t.userID == userID && t.isVisible == true)
                .OrderBy(t => t.defaultOrder).ToListAsync();
        }
    }
}