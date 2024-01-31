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
    public class NightController : ChecklistControllerBase {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public NightController(IUnitOfWork uow, IMapper mapper) : base(uow, mapper) {
            _uow = uow;
            _mapper = mapper;
        }

        [HttpPost("add")]
        public async Task<ActionResult<Night>> AddNightChecklist(Night night) {
            return await AddChecklist(night);
        }

        [HttpGet("getMyChecklists")] //?pageNumber=2&pageSize=3 (pageSize = -1 will return all entries)
        public async Task<ActionResult<PagedList<Night>>> GetMyNightChecklists([FromQuery]PageParams pageParams) {
            return await GetMyChecklists<Night>(pageParams);
        }

        [HttpGet("getMyChecklistById/{id}")]
        public async Task<ActionResult<Night>> GetMyNightChecklistById(int id) {
            return await GetMyChecklistById<Night>(id);
        }

        [HttpPut("update")]
        public async Task<ActionResult> UpdateNightChecklist(Night night) {
            return await UpdateChecklist(night);
        }


        [HttpPut("updateById/{id}")]
        public async Task<ActionResult> UpdateNightChecklistById(int id, [FromBody]Night night) {
            night.NightID = id;
            night.UserID = User.GetUserId();

            return await UpdateChecklist(night);
        }

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult> DeleteMessage(int id) {
            return await DeleteChecklist<Night>(id);
        }

        [HttpGet("getQuestionSet")]
        public async Task<ActionResult<IEnumerable<QuestionSet>>> GetQuestionSet() {
            return await GetQuestionSet<Night>();
        }
    }
}