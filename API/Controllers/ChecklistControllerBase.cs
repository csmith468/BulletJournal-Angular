// using API.Data.Interfaces;
// using Microsoft.AspNetCore.Mvc;
// using API.Models.Entities;
// using AutoMapper;
// using API.Extensions;
// using Microsoft.AspNetCore.Authorization;
// using API.Data.Pagination;
// using Microsoft.EntityFrameworkCore;
// using System.Dynamic;
// using System.Text.Json;

// namespace API.Controllers
// {
//     [Authorize]
//     public class ChecklistController : BaseApiController {
//         private readonly IUnitOfWork _uow;
//         private readonly IMapper _mapper;

//         public ChecklistController(IUnitOfWork uow, IMapper mapper) {
//             _uow = uow;
//             _mapper = mapper;
//         }

//         [HttpPost("{type}/add")]
//         public async Task<ActionResult<Checklist>> AddChecklist(string type, Checklist checklist) {
//             checklist.UserID = User.GetUserId();
//             if (await _uow.ChecklistRepository.DateUsedAsync<Checklist>(checklist.Date, checklist.UserID)) 
//                 return BadRequest("You already submitted an entry for this date.");
//             var result = await _uow.ChecklistRepository.AddAsync(type, checklist);
//             return Ok(result);
//         }

//         [HttpGet("{type}/getMyChecklists")] //?pageNumber=2&pageSize=3 (pageSize = -1 will return all entries)
//         public async Task<ActionResult<PagedList<Checklist>>> GetMyChecklists(string type, [FromQuery]PageParams pageParams) {
//             var userId = User.GetUserId();
//             var visibleColumns = await _uow.ChecklistRepository.GetVisibleColumnsAsync(type, userId);
//             var checklists = await _uow.ChecklistRepository.GetListAsync(type, userId, pageParams);

//             // visibleColumns.Append("Date").Append("ID");

//             var expandoList = checklists.Select(c => {
//                 var expandoObj = new ExpandoObject() as IDictionary<string, Object>;

//                 foreach (var prop in typeof(Checklist).GetProperties()) {
//                     if (visibleColumns.Contains(prop.Name, StringComparer.OrdinalIgnoreCase)) {
//                         var camelCaseName = JsonNamingPolicy.CamelCase.ConvertName(prop.Name);
//                         expandoObj.Add(camelCaseName, prop.GetValue(c));
//                     }
//                 }
//                 return expandoObj;
//             }).ToList();

//             var minDateChecklist = await _uow.ChecklistRepository.GetMinDateEntry(type, userId);
//             var maxDateChecklist = await _uow.ChecklistRepository.GetMaxDateEntry(type, userId);

//             Response.AddPaginationHeader(new PaginationHeader(checklists.CurrentPage, checklists.PageSize, checklists.TotalCount,
//                 checklists.TotalPages, minDateChecklist.Date, maxDateChecklist.Date, checklists.MinDate, checklists.MaxDate));

//             return Ok(expandoList);
//         }

//         [HttpGet("{type}/getMyChecklistById/{id}")]
//         public async Task<ActionResult<Checklist>> GetMyChecklistById(string type, int id) {
//             var userId = User.GetUserId();
//             var visibleColumns = await _uow.ChecklistRepository.GetVisibleColumnsAsync(type, userId);
//             var checklist = await _uow.ChecklistRepository.GetByIdAsync(type, userId, id);

//             if (checklist == null) return NotFound();

//             var expandoObj = new ExpandoObject() as IDictionary<string, Object>;

//             foreach (var prop in typeof(Checklist).GetProperties()) {
//                 if (visibleColumns.Contains(prop.Name, StringComparer.OrdinalIgnoreCase)) {
//                     var camelCaseName = JsonNamingPolicy.CamelCase.ConvertName(prop.Name);
//                     expandoObj.Add(camelCaseName, prop.GetValue(checklist));
//                 }
//             }

//             return Ok(expandoObj);
//         }

//         [HttpPut("{type}/update")]
//         public async Task<ActionResult> UpdateMorningChecklist(string type, Checklist checklist) {
//            return await UpdateChecklistHelper(type, checklist);
//         }


//         [HttpPut("{type}/updateById/{id}")]
//         public async Task<ActionResult> UpdateMorningChecklistById(string type, int id, [FromBody]Checklist checklist) {
//             checklist.ID = id;
//             checklist.UserID = User.GetUserId();

//             return await UpdateChecklistHelper(type, checklist);
//         }

//         [HttpDelete("{type}/delete/{id}")]
//         public async Task<ActionResult> DeleteChecklist(string type, int id) {
//             var checklist = await _uow.ChecklistRepository.GetByIdAsync(type, User.GetUserId(), id);
//             if (checklist == null) return NotFound();

//             _uow.ChecklistRepository.DeleteChecklist(type, checklist);
//             if (await _uow.Complete()) return NoContent();

//             return BadRequest("Failed to remove entry.");
//         }

//         [HttpGet("{type}/getQuestionSet")]
//         public async Task<ActionResult<IEnumerable<QuestionSet>>> GetQuestionSet(string type) {
//             var userId = User.GetUserId();
//             var visibleColumns = await _uow.ChecklistRepository.GetVisibleColumnsAsync(type, userId);
//             var questionSet = await _uow.SettingsRepository.GetQuestionPreferencesByTypeAsync(userId, type);
//             if (questionSet == null) return NotFound();

//             var visibleQuestionSet = questionSet.Where(q => visibleColumns.Contains(q.QuestionKey, StringComparer.OrdinalIgnoreCase));
//             return Ok(visibleQuestionSet);
//         }

//         private async Task<ActionResult> UpdateChecklistHelper(string type, Checklist inputChecklist) {
//             var userId = User.GetUserId();
//             var checklist = await _uow.ChecklistRepository.GetByIdAsync(type, userId, inputChecklist.ID);
//             if (checklist == null) return NotFound();
//             inputChecklist.UserID = userId;

//             if (checklist.Date != inputChecklist.Date) {
//                 if (await _uow.ChecklistRepository.DateUsedAsync(type, inputChecklist.Date, userId)) 
//                     return BadRequest("You already submitted an entry for this date.");
//             }

//             _mapper.Map(inputChecklist, checklist);
//             if (await _uow.Complete()) return NoContent();

//             return BadRequest("Failed to update entry.");
//         }
//     }
// }