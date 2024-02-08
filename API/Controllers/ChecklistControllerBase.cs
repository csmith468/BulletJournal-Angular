using API.Data.Interfaces;
using Microsoft.AspNetCore.Mvc;
using API.Models.Entities;
using AutoMapper;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using API.Data.Pagination;
using System.Dynamic;
using System.Text.Json;

namespace API.Controllers
{
    [Authorize]
    public class ChecklistControllerBase : BaseApiController {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public ChecklistControllerBase(IUnitOfWork uow, IMapper mapper) {
            _uow = uow;
            _mapper = mapper;
        }

        public async Task<ActionResult<T>> AddChecklist<T>(T checklist) where T : Checklist {
            checklist.UserID = User.GetUserId();
            if (await _uow.ChecklistRepository.DateUsedAsync<T>(checklist.Date, checklist.UserID)) 
                return BadRequest("You already submitted an entry for this date.");
            var result = await _uow.ChecklistRepository.AddAsync(checklist);
            return Ok(result);
        }

        //  (pageSize = -1 will return all entries)
        public async Task<ActionResult<PagedList<T>>> GetMyChecklists<T>(PageParams pageParams) where T : Checklist { 
            var invisibleColumns = await _uow.ChecklistRepository.GetInvisibleColumnsAsync<T>(User.GetUserId());
            var checklists = await _uow.ChecklistRepository.GetListAsync<T>(User.GetUserId(), pageParams);

            var expandoList = checklists.Select(c => {
                var expandoObj = new ExpandoObject() as IDictionary<string, Object>;

                foreach (var prop in typeof(T).GetProperties()) {
                    if (!invisibleColumns.Contains(prop.Name, StringComparer.OrdinalIgnoreCase)) {
                        var camelCaseName = JsonNamingPolicy.CamelCase.ConvertName(prop.Name);
                        expandoObj.Add(camelCaseName, prop.GetValue(c));
                    }
                }
                return expandoObj;
            }).ToList();

            Response.AddPaginationHeader(new PaginationHeader(checklists.CurrentPage, checklists.PageSize, checklists.TotalCount,
                checklists.TotalPages, checklists.MinDate, checklists.MaxDate));

            return Ok(expandoList);
        }

        public async Task<ActionResult<T>> GetMyChecklistById<T>(int id) where T : Checklist {
            var invisibleColumns = await _uow.ChecklistRepository.GetInvisibleColumnsAsync<T>(User.GetUserId());
            var checklist = await _uow.ChecklistRepository.GetByIdAsync<T>(User.GetUserId(), id);

            if (checklist == null) return NotFound();

            var expandoObj = new ExpandoObject() as IDictionary<string, Object>;

            foreach (var prop in typeof(T).GetProperties()) {
                if (!invisibleColumns.Contains(prop.Name, StringComparer.OrdinalIgnoreCase)) {
                    var camelCaseName = JsonNamingPolicy.CamelCase.ConvertName(prop.Name);
                    expandoObj.Add(camelCaseName, prop.GetValue(checklist));
                }
            }

            return Ok(expandoObj);
        }

        public async Task<ActionResult> UpdateChecklist<T>(T inputChecklist) where T : Checklist {
            var checklist = await _uow.ChecklistRepository.GetByIdAsync<T>(User.GetUserId(), inputChecklist.GetID());
            if (checklist == null) return NotFound();
            inputChecklist.UserID = User.GetUserId();

            if (checklist.Date != inputChecklist.Date) {
                if (await _uow.ChecklistRepository.DateUsedAsync<T>(inputChecklist.Date, User.GetUserId())) 
                    return BadRequest("You already submitted an entry for this date.");
            }

            _mapper.Map(inputChecklist, checklist);
            if (await _uow.Complete()) return NoContent();

            return BadRequest("Failed to update entry.");
        }

        public async Task<ActionResult> DeleteChecklist<T>(int id) where T : Checklist {
            var checklist = await _uow.ChecklistRepository.GetByIdAsync<T>(User.GetUserId(), id);
            if (checklist == null) return NotFound();

            _uow.ChecklistRepository.DeleteChecklist(checklist);
            if (await _uow.Complete()) return NoContent();

            return BadRequest("Failed to remove entry.");
        }

        public async Task<ActionResult<IEnumerable<QuestionSet>>> GetQuestionSet<T>() where T : Checklist {
            var invisibleColumns = await _uow.ChecklistRepository.GetInvisibleColumnsAsync<T>(User.GetUserId());
            var questionSet = await _uow.ChecklistRepository.GetQuestionSet<T>();
            if (questionSet == null) return NotFound();

            var visibleQuestionSet = questionSet.Where(q => !invisibleColumns.Contains(q.Key, StringComparer.OrdinalIgnoreCase));
            return Ok(visibleQuestionSet);
        }
    }
}