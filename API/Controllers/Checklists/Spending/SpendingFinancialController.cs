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
    public class SpendingFinancialController : ChecklistControllerBase {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public SpendingFinancialController(IUnitOfWork uow, IMapper mapper) : base(uow, mapper) {
            _uow = uow;
            _mapper = mapper;
        }

        [HttpPost("add")]
        public async Task<ActionResult<SpendingFinancial>> AddSpendingFinancialChecklist(SpendingFinancial spendingFinancial) {
            return await AddChecklist(spendingFinancial);
        }

        [HttpGet("getMyChecklists")] //?pageNumber=2&pageSize=3 (pageSize = -1 will return all entries)
        public async Task<ActionResult<PagedList<SpendingFinancial>>> GetMySpendingFinancialChecklists([FromQuery]PageParams pageParams) {
            return await GetMyChecklists<SpendingFinancial>(pageParams);
        }

        [HttpGet("getMyChecklistById/{id}")]
        public async Task<ActionResult<SpendingFinancial>> GetMySpendingFinancialChecklistById(int id) {
            return await GetMyChecklistById<SpendingFinancial>(id);
        }

        [HttpPut("update")]
        public async Task<ActionResult> UpdateSpendingFinancialChecklist(SpendingFinancial spendingFinancial) {
           return await UpdateChecklist(spendingFinancial);
        }


        [HttpPut("updateById/{id}")]
        public async Task<ActionResult> UpdateSpendingFinancialChecklistById(int id, [FromBody]SpendingFinancial spendingFinancial) {
            spendingFinancial.SpendingFinancialID = id;
            spendingFinancial.UserID = User.GetUserId();

            return await UpdateChecklist(spendingFinancial);
        }

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult> DeleteChecklist(int id) {
            return await DeleteChecklist<SpendingFinancial>(id);
        }

        [HttpGet("getQuestionSet")]
        public async Task<ActionResult<IEnumerable<QuestionSet>>> GetQuestionSet() {
            return await GetQuestionSet<SpendingFinancial>();
        }
    }
}