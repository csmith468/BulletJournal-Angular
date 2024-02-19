using API.Data.Interfaces;
using Microsoft.AspNetCore.Mvc;
using API.Models.Entities;
using AutoMapper;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using API.Data.Pagination;
using Microsoft.EntityFrameworkCore;
using System.Dynamic;
using System.Text.Json;
using System.Reflection;
using API.Models.DTOs;

namespace API.Controllers
{
    [Authorize]
    public class ChecklistController : BaseApiController {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public ChecklistController(IUnitOfWork uow, IMapper mapper) {
            _uow = uow;
            _mapper = mapper;
        }

        [HttpPost("{type}/add")]
        public async Task<ActionResult<Checklist>> AddChecklist(string type, Checklist checklist) {
            var userID = User.GetUserId();
            checklist.userID = userID;
            dynamic checklistRepository = GetTypedRepository(type);

            var targetType = Assembly.GetExecutingAssembly().GetTypes().FirstOrDefault(t => t.Name.ToLower() == type.ToLower());
            if (targetType == null || !targetType.IsSubclassOf(typeof(Checklist))) 
                return BadRequest("Invalid checklist type");

            if (await checklistRepository.DateUsedAsync(checklist.date, userID)) 
                return BadRequest("You already submitted an entry for this date.");
            
            var typedChecklist = Activator.CreateInstance(targetType);
            _mapper.Map(checklist, typedChecklist);
            
            // Use reflection to call AddAsync method
            dynamic addAsyncMethod = checklistRepository.GetType().GetMethod("AddAsync")!.Invoke(checklistRepository, new object[] { typedChecklist });
            return Ok(await addAsyncMethod);
        }

        [HttpGet("{type}/getMyChecklists")] //?pageNumber=2&pageSize=3 (pageSize = -1 will return all entries)
        public async Task<ActionResult<PagedList<Checklist>>> GetMyChecklists(string type, [FromQuery]PageParams pageParams) {
            var userID = User.GetUserId();
            dynamic checklistRepository = GetTypedRepository(type);
            
            var result = await checklistRepository.GetListAsync(userID, pageParams);

            if (result == null) return NoContent();

            var checklists = result.Item1;  
            var paginationHeader = result.Item2;

            HttpExtensions.AddPaginationHeader(Response, paginationHeader);

            return Ok(checklists);
        }

        [HttpGet("{type}/getMyChecklistById/{id}")]
        public async Task<ActionResult<Checklist>> GetMyChecklistById(string type, int id) {
            var userID = User.GetUserId();
            dynamic checklistRepository = GetTypedRepository(type);

            var checklist = await checklistRepository.GetByIdFilteredAsync(userID, id);
            if (checklist == null) return NotFound();

            return Ok(checklist);
        }

        [HttpPut("{type}/update")]
        public async Task<ActionResult> UpdateMorningChecklist(string type, Checklist checklist) {
           return await UpdateChecklistHelper(type, checklist);
        }


        [HttpPut("{type}/updateById/{id}")]
        public async Task<ActionResult> UpdateMorningChecklistById(string type, int id, [FromBody]Checklist checklist) {
            checklist.id = id;
            checklist.userID = User.GetUserId();

            return await UpdateChecklistHelper(type, checklist);
        }

        [HttpDelete("{type}/delete/{id}")]
        public async Task<ActionResult> DeleteChecklist(string type, int id) {
            dynamic checklistRepository = GetTypedRepository(type);

            var checklist = await checklistRepository.GetByIdAsync(User.GetUserId(), id);
            if (checklist == null) return NotFound();

            checklistRepository.DeleteChecklist(checklist);
            if (await _uow.Complete()) return NoContent();

            return BadRequest("Failed to remove entry.");
        }

        [HttpGet("{type}/getQuestionSet")]
        public async Task<ActionResult<IEnumerable<QuestionSetDto>>> GetQuestionSet(string type) {
            var userID = User.GetUserId();
            dynamic checklistRepository = GetTypedRepository(type);
            var questionSet = await checklistRepository.GetQuestionSetAsync(userID);
            if (questionSet == null) return NotFound();
            return Ok(questionSet);
        }

        private async Task<ActionResult> UpdateChecklistHelper(string type, Checklist inputChecklist) {
            var userID = User.GetUserId();
            dynamic checklistRepository = GetTypedRepository(type);

            var checklist = await checklistRepository.GetByIdAsync(userID, inputChecklist.id);
            if (checklist == null) return NotFound();
            inputChecklist.userID = userID;

            if (checklist.date != inputChecklist.date) {
                if (await checklistRepository.DateUsedAsync(inputChecklist.date, userID)) 
                    return BadRequest("You already submitted an entry for this date.");
            }

            _mapper.Map(inputChecklist, checklist);
            if (await _uow.Complete()) return NoContent();

            return BadRequest("Failed to update entry.");
        }

        private object GetTypedRepository(string type) {
            var targetType = Assembly.GetExecutingAssembly().GetTypes().FirstOrDefault(t => t.Name.ToLower() == type.ToLower());
            if (targetType == null || !targetType.IsSubclassOf(typeof(Checklist))) {
                return null;
            }
            return _uow.GetType()
                        .GetMethod("GetChecklistRepository")
                        .MakeGenericMethod(targetType)
                        .Invoke(_uow, null);
        }
    }
}