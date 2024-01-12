using API.Data.Interfaces;
using API.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Repositories {
    public class ChecklistRepository : IChecklistRepository {
        private readonly DataContextDapper _contextDapper;
        private readonly DataContextEF _contextEF;
        public ChecklistRepository(IConfiguration config) {
            _contextDapper = new DataContextDapper(config);
            _contextEF = new DataContextEF(config);
        }

        public async Task<MorningChecklist> AddMorningChecklist(MorningChecklist morningChecklist) {
            _contextEF.MorningChecklists.Add(morningChecklist);
            var result = await _contextEF.SaveChangesAsync() > 0;
            if (!result) return null;
            return morningChecklist;
        }

        public async Task<NightChecklist> AddNightChecklist(NightChecklist nightChecklist) {
            _contextEF.NightChecklists.Add(nightChecklist);
            var result = await _contextEF.SaveChangesAsync() > 0;
            if (!result) return null;
            return nightChecklist;
        }
    }
}