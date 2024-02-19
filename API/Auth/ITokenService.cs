using API.Models.Tables.Entities;

namespace API.Services
{
    public interface ITokenService {
        string CreateToken(AppUser user);
    }
}
