using System.Linq.Expressions;
using System.Reflection;
using API.Data.Interfaces;
using API.Data.Pagination;
using API.Models.Entities;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Repositories {
    public class ChecklistRepository : IChecklistRepository {
        // private readonly DataContextDapper _contextDapper;
        private readonly DataContextEF _contextEF;
        private readonly IMapper _mapper;
        public ChecklistRepository(DataContextEF contextEF, IMapper mapper) {
            _contextEF = contextEF;
            _mapper = mapper;
        }

        public async Task<T> AddAsync<T>(T item) where T : Checklist {
            _contextEF.Add(item);
            var result = await _contextEF.SaveChangesAsync() > 0;
            if (!result) return default;
            return item;
        }

        public async Task<bool> DateUsedAsync<T>(DateOnly date, int userId) where T : Checklist {
            var dbSet = _contextEF.Set<T>();
            return await dbSet.AnyAsync(x => x.Date == date && x.UserID == userId);
        }

        public async Task<PagedList<T>> GetListAsync<T>(int userId, PageParams pageParams) where T : Checklist {
            var dbSet = _contextEF.Set<T>();
            var query = dbSet.Where(x => x.UserID == userId)
                .OrderByDescending(x => x.Date)
                .AsNoTracking();
            return await PagedList<T>.CreateAsync(query, pageParams.PageNumber, pageParams.PageSize); // pageSize = -1 will return all entries on one page
        }

        public async Task<T> GetByIdAsync<T>(int userId, int itemID) where T : Checklist {
            var dbSet = _contextEF.Set<T>();

            // get name of ID for checklist (ex: MorningChecklist would be MorningChecklistID)
            PropertyInfo idProperty = typeof(T).GetProperty($"{typeof(T).Name}ID");
            if (idProperty == null) {
                throw new InvalidOperationException("ID property not found for class {typeof(T).Name}");
            }

            // creates expression parameter of type T named x
            var parameter = Expression.Parameter(typeof(T), "x");
            // uses the type held by x to get the ___ChecklistID property for that type
            var idSelectorExpression = Expression.Property(parameter, idProperty);

            // equivalent to .Where(x => x.___ChecklistID == ItemID)
            var itemIdPredicate = Expression.Equal(idSelectorExpression, Expression.Constant(itemID));
            var whereLambda = Expression.Lambda<Func<T, bool>>(itemIdPredicate, parameter);

            return await dbSet.Where(x => x.UserID == userId).Where(whereLambda).SingleOrDefaultAsync();
        }

        public void DeleteChecklist<T>(T checklist) where T : Checklist {
            var dbSet = _contextEF.Set<T>();
            dbSet.Remove(checklist);
        }

        public async Task<IEnumerable<QuestionSet>> GetQuestionSet<T>() where T : Checklist {
            return await _contextEF.QuestionSets.Where(x => x.Source == typeof(T).Name).ToListAsync();
        }
    }
}