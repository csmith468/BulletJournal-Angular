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
    public class SpendingPersonalController : ChecklistControllerBase {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public SpendingPersonalController(IUnitOfWork uow, IMapper mapper) : base(uow, mapper) {
            _uow = uow;
            _mapper = mapper;
        }

        [HttpPost("add")]
        public async Task<ActionResult<SpendingPersonal>> AddSpendingPersonalChecklist(SpendingPersonal spendingPersonal) {
            return await AddChecklist(spendingPersonal);
        }

        [HttpGet("getMyChecklists")] //?pageNumber=2&pageSize=3 (pageSize = -1 will return all entries)
        public async Task<ActionResult<PagedList<SpendingPersonal>>> GetMySpendingPersonalChecklists([FromQuery]PageParams pageParams) {
            return await GetMyChecklists<SpendingPersonal>(pageParams);
        }

        [HttpGet("getMyChecklistById/{id}")]
        public async Task<ActionResult<SpendingPersonal>> GetMySpendingPersonalChecklistById(int id) {
            return await GetMyChecklistById<SpendingPersonal>(id);
        }

        [HttpPut("update")]
        public async Task<ActionResult> UpdateSpendingPersonalChecklist(SpendingPersonal spendingPersonal) {
           return await UpdateChecklist(spendingPersonal);
        }


        [HttpPut("updateById/{id}")]
        public async Task<ActionResult> UpdateSpendingPersonalChecklistById(int id, [FromBody]SpendingPersonal spendingPersonal) {
            spendingPersonal.SpendingPersonalID = id;
            spendingPersonal.UserID = User.GetUserId();

            return await UpdateChecklist(spendingPersonal);
        }

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult> DeleteChecklist(int id) {
            return await DeleteChecklist<SpendingPersonal>(id);
        }

        [HttpGet("getQuestionSet")]
        public async Task<ActionResult<IEnumerable<QuestionSet>>> GetQuestionSet() {
            return await GetQuestionSet<SpendingPersonal>();
        }
    }
}