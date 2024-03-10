
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
        private readonly DataContextDapper _contextDapper;
        private readonly DataContextEF _contextEF;
        private readonly IMapper _mapper;
        public MetadataRepository(DataContextEF contextEF, DataContextDapper contextDapper, IMapper mapper) {
            _contextEF = contextEF;
            _mapper = mapper;
            _contextDapper = contextDapper;
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

        public async Task<IEnumerable<CompletedChecklists>> GetCompletedChecklistsPerDay(int userId) {
            List<string> checklistTypes = await _contextEF.ChecklistTypePreferencesView
                .Where(t => t.userID == userId && t.isVisible == true && t.isHeader != true)
                .OrderBy(t => t.defaultOrder)
                .Select(t => t.key)
                .ToListAsync();

            string sql = "";
            for (var i = 0; i < checklistTypes.Count; i++) {
                sql += @$"
                SELECT DISTINCT '{checklistTypes[i]}' AS checklistTypeName,
                    [checklistType].[label] AS checklistTypeLabel,
                    CAST([app_sys].fn_getUTCInUserTimezone(GETUTCDATE(), [user].[userID]) AS Date) AS [date],
                    [{checklistTypes[i]}].[id]
                FROM [app].[user]
                LEFT JOIN [checklist].[{checklistTypes[i]}] ON [{checklistTypes[i]}].[userID] = [user].[userID] 
                    AND [{checklistTypes[i]}].[Date] = CAST([app_sys].fn_getUTCInUserTimezone(GETUTCDATE(), [user].[userID]) AS Date)
                LEFT JOIN [app_sys].[checklistType] ON [checklistType].[key] = '{checklistTypes[i]}'
                LEFT JOIN [app_sys].[checklistType] [category] ON [category].[key] = [checklistType].[category]
                WHERE [user].[userID] = {userId} 
                ";
                if (i < checklistTypes.Count - 1) {
                    sql += " UNION ALL ";
                }
            }

            return await _contextDapper.QueryAsync<CompletedChecklists>(sql);
        }
    }
}