using API.Data.Interfaces;
using API.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Repositories {
    public class SleepRepository : ISleepRepository {
        private readonly DataContextDapper _contextDapper;
        private readonly DataContextEF _contextEF;
        public SleepRepository(IConfiguration config) {
            _contextDapper = new DataContextDapper(config);
            _contextEF = new DataContextEF(config);
        }

        public async Task<SleepRecord> AddSleep(SleepRecord sleep) {
            _contextEF.SleepRecords.Add(sleep);
            var result = await _contextEF.SaveChangesAsync() > 0;
            if (!result) return null;
            return sleep;
        }
    }
}