using API.Data.Interfaces;
using API.Models.Entities;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Repositories {
    public class SleepRepository : ISleepRepository {
        // private readonly DataContextDapper _contextDapper;
        private readonly DataContextEF _contextEF;
        private readonly IMapper _mapper;
        public SleepRepository(DataContextEF contextEF, IMapper mapper) {
            _contextEF = contextEF;
            _mapper = mapper;
        }
        public async Task<SleepRecord> AddSleep(SleepRecord sleep) {
            _contextEF.SleepRecords.Add(sleep);
            var result = await _contextEF.SaveChangesAsync() > 0;
            if (!result) return null;
            return sleep;
        }
    }
}