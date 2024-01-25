using API.Data;
using API.Data.Interfaces;
using API.Data.Repositories;
using Microsoft.AspNetCore.Mvc;
using API.Models.Entities;
using AutoMapper;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using API.Data.Pagination;

namespace API.Controllers
{
    [Authorize]
    public class ChecklistController : BaseApiController {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public ChecklistController(IUnitOfWork uow, IMapper mapper) {
            _uow = uow;
            _mapper = mapper;
        }

        [HttpPost("morning/add")]
        public async Task<ActionResult<MorningChecklist>> AddMorningChecklist(MorningChecklist morningChecklist) {
            morningChecklist.UserID = User.GetUserId();
            if (await _uow.ChecklistRepository.MorningDateUsedAsync(morningChecklist.Date, morningChecklist.UserID)) 
                return BadRequest("User already submitted morning checklist for this date.");
            var result = await _uow.ChecklistRepository.AddMorningChecklistAsync(morningChecklist);
            return Ok(result);
        }

        [HttpPost("night/add")]
        public async Task<ActionResult<NightChecklist>> AddNightChecklist(NightChecklist nightChecklist) {
            nightChecklist.UserID = User.GetUserId();
            if (await _uow.ChecklistRepository.NightDateUsedAsync(nightChecklist.Date, nightChecklist.UserID)) 
                return BadRequest("User already submitted morning checklist for this date.");
            var result = await _uow.ChecklistRepository.AddNightChecklistAsync(nightChecklist);
            return Ok(result);
        }

        [HttpGet("morning/getMyChecklists")] //?pageNumber=2&pageSize=3
        public async Task<ActionResult<PagedList<MorningChecklist>>> GetMyMorningChecklists([FromQuery]PageParams pageParams) {
            var userId = User.GetUserId();
            var checklists = await _uow.ChecklistRepository.GetMyMorningChecklistsAsync(userId, pageParams);

            Response.AddPaginationHeader(new PaginationHeader(checklists.CurrentPage, checklists.PageSize, checklists.TotalCount,
                checklists.TotalPages));

            return Ok(checklists);
        }

        [HttpGet("night/getMyChecklists")] //?pageNumber=2&pageSize=3
        public async Task<ActionResult<PagedList<NightChecklist>>> GetMyNightChecklists([FromQuery]PageParams pageParams) {
            var userId = User.GetUserId();
            var checklists = await _uow.ChecklistRepository.GetMyNightChecklistsAsync(userId, pageParams);

            Response.AddPaginationHeader(new PaginationHeader(checklists.CurrentPage, checklists.PageSize, checklists.TotalCount,
                checklists.TotalPages));

            return Ok(checklists);
        }

        [HttpGet("morning/getMyChecklistById/{id}")]
        public async Task<ActionResult<MorningChecklist>> GetMyMorningChecklistById(int id) {
            var userId = User.GetUserId();
            var checklist = await _uow.ChecklistRepository.GetMyMorningChecklistByIdAsync(userId, id);
            return Ok(checklist);
        }

        [HttpGet("night/getMyChecklistById/{id}")]
        public async Task<ActionResult<NightChecklist>> GetMyNightChecklistById(int id) {
            var userId = User.GetUserId();
            var checklist = await _uow.ChecklistRepository.GetMyNightChecklistByIdAsync(userId, id);
            return Ok(checklist);
        }

        [HttpPut("morning/update")]
        public async Task<ActionResult> UpdateMorningChecklist(MorningChecklist morningChecklist) {
            if (morningChecklist.UserID != User.GetUserId()) return Unauthorized();

            var checklist = await _uow.ChecklistRepository.GetMyMorningChecklistByIdAsync(morningChecklist.UserID, morningChecklist.MorningChecklistID);
            if (checklist == null) return NotFound();

            checklist = morningChecklist;
            if (await _uow.Complete()) return NoContent();

            return BadRequest("Failed to update user.");
        }
    }
}