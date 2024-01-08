using API.Data;
using API.Interfaces;

namespace API.Repositories {
    public class UnitOfWork : IUnitOfWork {
        private readonly DataContextDapper _contextDapper;
        private readonly DataContextEF _contextEF;
        public UnitOfWork(DataContextDapper contextDapper, DataContextEF contextEF) {
            _contextDapper = contextDapper;
            _contextEF = contextEF;
        }

        public IUserRepository UserRepository => new UserRepository(_contextDapper, _contextEF);
        
        public async Task<bool> Complete() {
            return await _contextEF.SaveChangesAsync() > 0;
        }

        public bool HasChanges() {
            return _contextEF.ChangeTracker.HasChanges();
        }
    }
}