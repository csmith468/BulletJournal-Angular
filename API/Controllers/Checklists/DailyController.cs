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
    public class DailyController : ChecklistControllerBase {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public DailyController(IUnitOfWork uow, IMapper mapper) : base(uow, mapper) {
            _uow = uow;
            _mapper = mapper;
        }

        [HttpPost("add")]
        public async Task<ActionResult<Daily>> AddDailyChecklist(Daily daily) {
            return await AddChecklist(daily);
        }

        [HttpGet("getMyChecklists")] //?pageNumber=2&pageSize=3 (pageSize = -1 will return all entries)
        public async Task<ActionResult<PagedList<Daily>>> GetMyDailyChecklists([FromQuery]PageParams pageParams) {
            return await GetMyChecklists<Daily>(pageParams);
        }

        [HttpGet("getMyChecklistById/{id}")]
        public async Task<ActionResult<Daily>> GetMyDailyChecklistById(int id) {
            return await GetMyChecklistById<Daily>(id);
        }

        [HttpPut("update")]
        public async Task<ActionResult> UpdateDailyChecklist(Daily daily) {
           return await UpdateChecklist(daily);
        }


        [HttpPut("updateById/{id}")]
        public async Task<ActionResult> UpdateDailyChecklistById(int id, [FromBody]Daily daily) {
            daily.DailyID = id;
            daily.UserID = User.GetUserId();

            return await UpdateChecklist(daily);
        }

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult> DeleteChecklist(int id) {
            return await DeleteChecklist<Daily>(id);
        }

        [HttpGet("getQuestionSet")]
        public async Task<ActionResult<IEnumerable<QuestionSet>>> GetQuestionSet() {
            return await GetQuestionSet<Daily>();
        }
    }
}