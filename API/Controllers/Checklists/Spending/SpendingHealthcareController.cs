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
    public class SpendingHealthcareController : ChecklistControllerBase {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public SpendingHealthcareController(IUnitOfWork uow, IMapper mapper) : base(uow, mapper) {
            _uow = uow;
            _mapper = mapper;
        }

        [HttpPost("add")]
        public async Task<ActionResult<SpendingHealthcare>> AddSpendingHealthcareChecklist(SpendingHealthcare spendingHealthcare) {
            return await AddChecklist(spendingHealthcare);
        }

        [HttpGet("getMyChecklists")] //?pageNumber=2&pageSize=3 (pageSize = -1 will return all entries)
        public async Task<ActionResult<PagedList<SpendingHealthcare>>> GetMySpendingHealthcareChecklists([FromQuery]PageParams pageParams) {
            return await GetMyChecklists<SpendingHealthcare>(pageParams);
        }

        [HttpGet("getMyChecklistById/{id}")]
        public async Task<ActionResult<SpendingHealthcare>> GetMySpendingHealthcareChecklistById(int id) {
            return await GetMyChecklistById<SpendingHealthcare>(id);
        }

        [HttpPut("update")]
        public async Task<ActionResult> UpdateSpendingHealthcareChecklist(SpendingHealthcare spendingHealthcare) {
           return await UpdateChecklist(spendingHealthcare);
        }


        [HttpPut("updateById/{id}")]
        public async Task<ActionResult> UpdateSpendingHealthcareChecklistById(int id, [FromBody]SpendingHealthcare spendingHealthcare) {
            spendingHealthcare.SpendingHealthcareID = id;
            spendingHealthcare.UserID = User.GetUserId();

            return await UpdateChecklist(spendingHealthcare);
        }

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult> DeleteChecklist(int id) {
            return await DeleteChecklist<SpendingHealthcare>(id);
        }

        [HttpGet("getQuestionSet")]
        public async Task<ActionResult<IEnumerable<QuestionSet>>> GetQuestionSet() {
            return await GetQuestionSet<SpendingHealthcare>();
        }
    }
}