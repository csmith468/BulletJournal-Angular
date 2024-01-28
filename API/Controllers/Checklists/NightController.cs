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
        public async Task<ActionResult<NightChecklist>> AddNightChecklist(NightChecklist nightChecklist) {
            return await AddChecklist(nightChecklist);
        }

        [HttpGet("getMyChecklists")] //?pageNumber=2&pageSize=3
        public async Task<ActionResult<PagedList<NightChecklist>>> GetMyNightChecklists([FromQuery]PageParams pageParams) {
            return await GetMyChecklists<NightChecklist>(pageParams);
        }

        [HttpGet("getMyChecklistById/{id}")]
        public async Task<ActionResult<NightChecklist>> GetMyNightChecklistById(int id) {
            return await GetMyChecklistById<NightChecklist>(id);
        }

        [HttpPut("update")]
        public async Task<ActionResult> UpdateNightChecklist(NightChecklist nightChecklist) {
            return await UpdateChecklist(nightChecklist);
        }


        [HttpPut("updateById/{id}")]
        public async Task<ActionResult> UpdateNightChecklistById(int id, [FromBody]NightChecklist nightChecklist) {
            nightChecklist.NightChecklistID = id;
            nightChecklist.UserID = User.GetUserId();

            return await UpdateChecklist(nightChecklist);
        }
    }
}