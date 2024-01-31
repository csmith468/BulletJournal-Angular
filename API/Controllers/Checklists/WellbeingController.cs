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
    public class WellbeingController : ChecklistControllerBase {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public WellbeingController(IUnitOfWork uow, IMapper mapper) : base(uow, mapper) {
            _uow = uow;
            _mapper = mapper;
        }

        [HttpPost("add")]
        public async Task<ActionResult<Wellbeing>> AddWellbeingChecklist(Wellbeing wellbeing) {
            return await AddChecklist(wellbeing);
        }

        [HttpGet("getMyChecklists")] //?pageNumber=2&pageSize=3 (pageSize = -1 will return all entries)
        public async Task<ActionResult<PagedList<Wellbeing>>> GetMyWellbeingChecklists([FromQuery]PageParams pageParams) {
            return await GetMyChecklists<Wellbeing>(pageParams);
        }

        [HttpGet("getMyChecklistById/{id}")]
        public async Task<ActionResult<Wellbeing>> GetMyWellbeingChecklistById(int id) {
            return await GetMyChecklistById<Wellbeing>(id);
        }

        [HttpPut("update")]
        public async Task<ActionResult> UpdateWellbeingChecklist(Wellbeing wellbeing) {
           return await UpdateChecklist(wellbeing);
        }


        [HttpPut("updateById/{id}")]
        public async Task<ActionResult> UpdateWellbeingChecklistById(int id, [FromBody]Wellbeing wellbeing) {
            wellbeing.WellbeingID = id;
            wellbeing.UserID = User.GetUserId();

            return await UpdateChecklist(wellbeing);
        }

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult> DeleteMessage(int id) {
            return await DeleteChecklist<Wellbeing>(id);
        }

        [HttpGet("getQuestionSet")]
        public async Task<ActionResult<IEnumerable<QuestionSet>>> GetQuestionSet() {
            return await GetQuestionSet<Wellbeing>();
        }
    }
}