using System.Dynamic;
using System.Linq.Expressions;
using System.Reflection;
using System.Text.Json;
using API.Data.Interfaces;
using API.Data.Pagination;
using API.Models.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

namespace API.Data.Repositories {
    public class ChecklistRepository<T> : IChecklistRepository<T>  where T : Checklist {
        private readonly DataContextDapper _contextDapper;
        private readonly DataContextEF _contextEF;
        private readonly IMapper _mapper;
        public ChecklistRepository(DataContextEF contextEF, IMapper mapper, DataContextDapper contextDapper) {
            _contextEF = contextEF;
            _mapper = mapper;
            _contextDapper = contextDapper;
        }

        public async Task<Dictionary<string, object>> AddAsync(T item) {
            _contextEF.Add(item);
            var result = await _contextEF.SaveChangesAsync() > 0;
            if (result) return await GetFilteredChecklistSingle(item.UserID, item);
            return null;
        }

        public async Task<bool> DateUsedAsync(DateOnly date, int userId) {
            var dbSet = _contextEF.Set<T>();
            return await dbSet.AnyAsync(x => x.Date == date && x.UserID == userId);
        }

        public async Task<Tuple<List<Dictionary<string, object>>, PaginationHeader>> GetListAsync(int userId, PageParams pageParams) {
            var dbSet = _contextEF.Set<T>();

            var query = dbSet.AsQueryable();
            query = query.Where(x => x.UserID == userId).OrderByDescending(x => x.Date);

            if (pageParams.MinDate != null) query = query.Where(x => x.Date >= pageParams.MinDate);
            if (pageParams.MaxDate != null) query = query.Where(x => x.Date <= pageParams.MaxDate);

            query = query.AsNoTracking();
            
            var checklists = PagedList<T>.CreateAsync(query, pageParams.PageNumber, pageParams.PageSize).Result; // pageSize = -1 will return all entries on one page
            
            if (checklists.Count() == 0) return null; 

            var filteredChecklists = await GetFilteredChecklistList(userId, checklists);

            var minDateChecklist = await GetMinDateEntry(userId);
            var maxDateChecklist = await GetMaxDateEntry(userId);

            var paginationHeader = new PaginationHeader(
                checklists.CurrentPage, checklists.PageSize, checklists.TotalCount,
                checklists.TotalPages, minDateChecklist.Date, maxDateChecklist.Date,
                checklists.MinDate, checklists.MaxDate);

            return Tuple.Create(filteredChecklists, paginationHeader);
        }

        public async Task<IDictionary<string, object>> GetByIdAsync(int userId, int itemID) {
            var dbSet = _contextEF.Set<T>();
            
            dynamic checklist = await dbSet
                .Where(x => x.UserID == userId && x.ID == itemID)
                .FirstOrDefaultAsync();

            return await GetFilteredChecklistSingle(userId, checklist);
        }

        public async Task<T> GetMinDateEntry(int userID) {
            var dbSet = _contextEF.Set<T>();
            return await dbSet.Where(x => x.UserID == userID).OrderBy(x => x.Date).FirstOrDefaultAsync();
        }

        public async Task<T> GetMaxDateEntry(int userID) {
            var dbSet = _contextEF.Set<T>();
            return await dbSet.Where(x => x.UserID == userID).OrderByDescending(x => x.Date).FirstOrDefaultAsync();
        }

        public void DeleteChecklist(T checklist) {
            var dbSet = _contextEF.Set<T>();
            dbSet.Remove(checklist);
        }

        public async Task<IEnumerable<string>> GetVisibleColumnsAsync(int userId) {
            var visibleColumns = await _contextEF.QuestionPreferences
                .Where(p => p.UserID == userId && p.TableName.ToLower() == typeof(T).Name.ToLower() && p.IsQuestionVisible == true)
                .Select(p => p.QuestionKey)
                .ToListAsync();

            var result = new List<string>(visibleColumns) { "ID" }; //or result.Add("ID");
            return result;
        }


        // public async Task<IEnumerable<CompletedChecklists>> GetCompletedChecklistsPerDay(int userId) {
        //     List<string> tables = await _contextEF.TablePreferences
        //         .Where(t => t.UserID == userId && t.IsTableVisible == true)
        //         .Select(t => t.TableName).ToListAsync();

        //     string sql = "";
        //     for (var i = 0; i < tables.Count; i++) {
        //         sql += @$"
        //         SELECT '{tables[i]}' AS TableName,
        //             ISNULL([category].[DisplayName] + ' ', '') + [tables].[DisplayName] AS TableLabel,
        //             CAST([app_sys].GetUTCInUserTimezone(GETUTCDATE(), [user].[UserID]) AS Date) AS [Date],
        //             [{tables[i]}].[{tables[i]}ID] AS ID
        //         FROM [app_sys].[user]
        //         LEFT JOIN [app].[{tables[i]}] ON [{tables[i]}].[UserID] = [user].[UserID] 
        //             AND [{tables[i]}].[Date] = CAST([app_sys].GetUTCInUserTimezone(GETUTCDATE(), [user].[UserID]) AS Date)
        //         LEFT JOIN [app_sys].[tables] ON [tables].[key] = '{tables[i]}'
        //         LEFT JOIN [app_sys].[tables] [category] ON [category].[key] = [tables].[category]
        //         AND [user].[UserID] = {userId} 
        //         ";
        //         if (i < tables.Count - 1) {
        //             sql += " UNION ALL ";
        //         }
        //     }

        //     return await _contextDapper.QueryAsync<CompletedChecklists>(sql);
        // }


        private async Task<List<Dictionary<string, object>>> GetFilteredChecklistList(int userId, PagedList<T> checklists) {
            var visibleColumns = await GetVisibleColumnsAsync(userId);
            var columnNames = ((IEnumerable<dynamic>)visibleColumns).Cast<string>().ToList();

            var expandoList = checklists.Select(c => {
                var expandoObj = new Dictionary<string, object>();

                foreach (var prop in typeof(T).GetProperties()) {
                    if (columnNames.Any(vc => string.Equals(vc, prop.Name, StringComparison.OrdinalIgnoreCase))) {
                        var formattedName = JsonNamingPolicy.CamelCase.ConvertName(prop.Name);
                        expandoObj.Add(formattedName, prop.GetValue(c));
                    }
                }
                return expandoObj;
            }).ToList();

            return expandoList;
        }

        private async Task<Dictionary<string, object>> GetFilteredChecklistSingle(int userId, T checklist) {
            var visibleColumns = await GetVisibleColumnsAsync(userId);
            // var columnNames = ((IEnumerable<dynamic>)visibleColumns).Cast<string>().ToList();

            var expandoObj = new Dictionary<string, object>();

            foreach (var prop in typeof(Checklist).GetProperties()) {
                if (visibleColumns.Contains(prop.Name)) {
                    var camelCaseName = JsonNamingPolicy.CamelCase.ConvertName(prop.Name);
                    expandoObj.Add(camelCaseName, prop.GetValue(checklist));
                }
            }
            return expandoObj;
        }


        // private DbSet<Checklist> GetDbSetByType(string type) {
        //     var dbSetProperty = _contextEF.GetType().GetProperties()
        //         .FirstOrDefault(p =>
        //             p.PropertyType.IsGenericType &&
        //             p.PropertyType.GetGenericTypeDefinition() == typeof(DbSet<Checklist>) &&
        //             p.Name.ToLower() == type.ToLower()
        //         );

        //     return (DbSet<Checklist>)dbSetProperty?.GetValue(_contextEF);
        //     // return dbSetValue.Where(x => x.UserID == userId && x.ID == itemID).SingleOrDefaultAsync();
        // }
        // private IQueryable<Checklist> GetDbSetByType(string type) {
        //     var baseDbSet = _contextEF.Set<Checklist>();
        //     var derivedDbSet = baseDbSet.OfType<Checklist>().Where(c => EF.Property<string>(c, "Type").ToLower() == type.ToLower());
        //     return derivedDbSet;
        // }


    }
}