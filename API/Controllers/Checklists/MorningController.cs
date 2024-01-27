using API.Data.Interfaces;
using Microsoft.AspNetCore.Mvc;
using API.Models.Entities;
using AutoMapper;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using API.Data.Pagination;
using API.Models.DTOs;

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
        public async Task<ActionResult<MorningChecklist>> AddMorningChecklist(MorningChecklist morningChecklist) {
            return await AddChecklist(morningChecklist);
        }

        [HttpGet("getMyChecklists")] //?pageNumber=2&pageSize=3
        public async Task<ActionResult<PagedList<MorningChecklist>>> GetMyMorningChecklists([FromQuery]PageParams pageParams) {
            return await GetMyChecklists<MorningChecklist>(pageParams);
        }

        [HttpGet("getMyChecklistById/{id}")]
        public async Task<ActionResult<MorningChecklist>> GetMyMorningChecklistById(int id) {
            var userId = User.GetUserId();
            var checklist = await _uow.ChecklistRepository.GetByIdAsync<MorningChecklist>(userId, id);
            return Ok(checklist);
        }

        [HttpPut("update")]
        public async Task<ActionResult> UpdateMorningChecklist(MorningChecklist morningChecklist) {
           return await UpdateChecklist(morningChecklist);
        }


        [HttpPut("updateById/{id}")]
        public async Task<ActionResult> UpdateMorningChecklistById(int id, [FromBody]MorningChecklistDto morningChecklistDto) {
            var morningChecklist = _mapper.Map<MorningChecklist>(morningChecklistDto);
            morningChecklist.MorningChecklistID = id;
            morningChecklist.UserID = User.GetUserId();

            return await UpdateChecklist(morningChecklist);
        }
    }
}