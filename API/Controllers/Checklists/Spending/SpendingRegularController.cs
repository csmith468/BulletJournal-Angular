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
    public class SpendingRegularController : ChecklistControllerBase {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public SpendingRegularController(IUnitOfWork uow, IMapper mapper) : base(uow, mapper) {
            _uow = uow;
            _mapper = mapper;
        }

        [HttpPost("add")]
        public async Task<ActionResult<SpendingRegular>> AddSpendingRegularChecklist(SpendingRegular spendingRegular) {
            return await AddChecklist(spendingRegular);
        }

        [HttpGet("getMyChecklists")] //?pageNumber=2&pageSize=3 (pageSize = -1 will return all entries)
        public async Task<ActionResult<PagedList<SpendingRegular>>> GetMySpendingRegularChecklists([FromQuery]PageParams pageParams) {
            return await GetMyChecklists<SpendingRegular>(pageParams);
        }

        [HttpGet("getMyChecklistById/{id}")]
        public async Task<ActionResult<SpendingRegular>> GetMySpendingRegularChecklistById(int id) {
            return await GetMyChecklistById<SpendingRegular>(id);
        }

        [HttpPut("update")]
        public async Task<ActionResult> UpdateSpendingRegularChecklist(SpendingRegular spendingRegular) {
           return await UpdateChecklist(spendingRegular);
        }


        [HttpPut("updateById/{id}")]
        public async Task<ActionResult> UpdateSpendingRegularChecklistById(int id, [FromBody]SpendingRegular spendingRegular) {
            spendingRegular.SpendingRegularID = id;
            spendingRegular.UserID = User.GetUserId();

            return await UpdateChecklist(spendingRegular);
        }

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult> DeleteChecklist(int id) {
            return await DeleteChecklist<SpendingRegular>(id);
        }

        [HttpGet("getQuestionSet")]
        public async Task<ActionResult<IEnumerable<QuestionSet>>> GetQuestionSet() {
            return await GetQuestionSet<SpendingRegular>();
        }
    }
}