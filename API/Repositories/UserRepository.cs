using API.Data;
using API.Interfaces;

namespace API.Repositories {
    public class UserRepository : IUserRepository {
        private readonly DataContextDapper _contextDapper;
        private readonly DataContextEF _contextEF;
        public UserRepository(DataContextDapper contextDapper, DataContextEF contextEF) {
            _contextDapper = contextDapper;
            _contextEF = contextEF;
        }
        
    }
}