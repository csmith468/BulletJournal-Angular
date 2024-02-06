using API.Data.Interfaces;
using Microsoft.AspNetCore.Mvc;
using API.Models.Entities;
using AutoMapper;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using API.Data.Pagination;

namespace API.Controllers
{
    [Authorize]
    public class MorningController : ChecklistControllerBase {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public MorningController(IUnitOfWork uow, IMapper mapper) : base(uow, mapper) {
            _uow = uow;
            _mapper = mapper;
        }

        [HttpPost("add")]
        public async Task<ActionResult<Morning>> AddMorningChecklist(Morning morning) {
            return await AddChecklist(morning);
        }

        [HttpGet("getMyChecklists")] //?pageNumber=2&pageSize=3 (pageSize = -1 will return all entries)
        public async Task<ActionResult<PagedList<Morning>>> GetMyMorningChecklists([FromQuery]PageParams pageParams) {
            return await GetMyChecklists<Morning>(pageParams);
        }

        [HttpGet("getMyChecklistById/{id}")]
        public async Task<ActionResult<Morning>> GetMyMorningChecklistById(int id) {
            return await GetMyChecklistById<Morning>(id);
        }

        [HttpPut("update")]
        public async Task<ActionResult> UpdateMorningChecklist(Morning morning) {
           return await UpdateChecklist(morning);
        }


        [HttpPut("updateById/{id}")]
        public async Task<ActionResult> UpdateMorningChecklistById(int id, [FromBody]Morning morning) {
            morning.MorningID = id;
            morning.UserID = User.GetUserId();

            return await UpdateChecklist(morning);
        }

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult> DeleteChecklist(int id) {
            return await DeleteChecklist<Morning>(id);
        }

        [HttpGet("getQuestionSet")]
        public async Task<ActionResult<IEnumerable<QuestionSet>>> GetQuestionSet() {
            return await GetQuestionSet<Morning>();
        }
    }
}