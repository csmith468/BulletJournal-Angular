using API.Data.Interfaces;

namespace API.Data.Repositories {
    public class UnitOfWork : IUnitOfWork {
        private readonly DataContextDapper _contextDapper;
        private readonly DataContextEF _contextEF;
        private readonly IConfiguration _config;
        public UnitOfWork(IConfiguration config) {
            _contextDapper = new DataContextDapper(config);
            _contextEF = new DataContextEF(config);
            _config = config;
        }

        public IUserRepository UserRepository => new UserRepository(_config);
        
        public async Task<bool> Complete() {
            return await _contextEF.SaveChangesAsync() > 0;
        }

        public bool HasChanges() {
            return _contextEF.ChangeTracker.HasChanges();
        }
    }
}