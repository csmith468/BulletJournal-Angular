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
    public class PhysicalController : ChecklistControllerBase {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public PhysicalController(IUnitOfWork uow, IMapper mapper) : base(uow, mapper) {
            _uow = uow;
            _mapper = mapper;
        }

        [HttpPost("add")]
        public async Task<ActionResult<Physical>> AddPhysicalChecklist(Physical physical) {
            return await AddChecklist(physical);
        }

        [HttpGet("getMyChecklists")] //?pageNumber=2&pageSize=3 (pageSize = -1 will return all entries)
        public async Task<ActionResult<PagedList<Physical>>> GetMyPhysicalChecklists([FromQuery]PageParams pageParams) {
            return await GetMyChecklists<Physical>(pageParams);
        }

        [HttpGet("getMyChecklistById/{id}")]
        public async Task<ActionResult<Physical>> GetMyPhysicalChecklistById(int id) {
            return await GetMyChecklistById<Physical>(id);
        }

        [HttpPut("update")]
        public async Task<ActionResult> UpdatePhysicalChecklist(Physical physical) {
           return await UpdateChecklist(physical);
        }


        [HttpPut("updateById/{id}")]
        public async Task<ActionResult> UpdatePhysicalChecklistById(int id, [FromBody]Physical physical) {
            physical.PhysicalID = id;
            physical.UserID = User.GetUserId();

            return await UpdateChecklist(physical);
        }

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult> DeleteChecklist(int id) {
            return await DeleteChecklist<Physical>(id);
        }

        [HttpGet("getQuestionSet")]
        public async Task<ActionResult<IEnumerable<QuestionSet>>> GetQuestionSet() {
            return await GetQuestionSet<Physical>();
        }
    }
}