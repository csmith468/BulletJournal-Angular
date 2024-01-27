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
    public class NightController : BaseApiController {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public NightController(IUnitOfWork uow, IMapper mapper) {
            _uow = uow;
            _mapper = mapper;
        }

        [HttpPost("add")]
        public async Task<ActionResult<NightChecklist>> AddNightChecklist(NightChecklist nightChecklist) {
            nightChecklist.UserID = User.GetUserId();
            if (await _uow.NightRepository.DateUsedAsync(nightChecklist.Date, nightChecklist.UserID)) 
                return BadRequest("User already submitted night checklist for this date.");
            var result = await _uow.NightRepository.AddAsync(nightChecklist);
            return Ok(result);
        }

        [HttpGet("getMyChecklists")] //?pageNumber=2&pageSize=3
        public async Task<ActionResult<PagedList<NightChecklist>>> GetMyNightChecklists([FromQuery]PageParams pageParams) {
            var userId = User.GetUserId();
            var checklists = await _uow.NightRepository.GetListAsync(userId, pageParams);

            Response.AddPaginationHeader(new PaginationHeader(checklists.CurrentPage, checklists.PageSize, checklists.TotalCount,
                checklists.TotalPages));

            return Ok(checklists);
        }

        [HttpGet("getMyChecklistById/{id}")]
        public async Task<ActionResult<NightChecklist>> GetMyNightChecklistById(int id) {
            var userId = User.GetUserId();
            var checklist = await _uow.NightRepository.GetByIdAsync(userId, id);
            return Ok(checklist);
        }

        [HttpPut("update")]
        public async Task<ActionResult> UpdateNightChecklist(NightChecklist nightChecklist) {
            var checklist = await _uow.NightRepository.GetByIdAsync(User.GetUserId(), nightChecklist.NightChecklistID);
            if (checklist == null) return NotFound();
            nightChecklist.UserID = User.GetUserId();

            if (checklist.Date != nightChecklist.Date) {
                if (await _uow.NightRepository.DateUsedAsync(nightChecklist.Date, User.GetUserId())) 
                    return BadRequest("You already submitted a night entry for this date.");
            }

            _mapper.Map(nightChecklist, checklist);
            if (await _uow.Complete()) return NoContent();

            return BadRequest("Failed to update user.");
        }


        [HttpPut("updateById/{id}")]
        public async Task<ActionResult> UpdateNightChecklistById(int id, [FromBody]NightChecklistDto nightChecklistDto) {
            var checklist = await _uow.NightRepository.GetByIdAsync(User.GetUserId(), id);
            if (checklist == null) return NotFound();

            if (checklist.Date != nightChecklistDto.Date) {
                if (await _uow.NightRepository.DateUsedAsync(nightChecklistDto.Date, User.GetUserId())) 
                    return BadRequest("You already submitted a night entry for this date.");
            }

            _mapper.Map(nightChecklistDto, checklist);
            if (await _uow.Complete()) return NoContent();

            return BadRequest("Failed to update user.");
        }
    }
}