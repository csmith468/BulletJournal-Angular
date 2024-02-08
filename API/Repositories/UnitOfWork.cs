using API.Data.Interfaces;
using API.Models.Entities;
using AutoMapper;

namespace API.Data.Repositories {
    public class UnitOfWork : IUnitOfWork {
        // private readonly DataContextDapper _contextDapper;
        private readonly DataContextEF _contextEF;
        private readonly IMapper _mapper;
        public UnitOfWork(DataContextEF contextEF, IMapper mapper) {
            _contextEF = contextEF;
            _mapper = mapper;
        }

        public IAccountRepository AccountRepository => new AccountRepository(_contextEF, _mapper);
        public ISettingsRepository SettingsRepository => new SettingsRepository(_contextEF, _mapper);
        public IChecklistRepository ChecklistRepository => new ChecklistRepository(_contextEF, _mapper);
        public async Task<bool> Complete() {
            var r = HasChanges();
            var result = await _contextEF.SaveChangesAsync();
            return result > 0;
        }

        public bool HasChanges() {
            return _contextEF.ChangeTracker.HasChanges();
        }
    }
}