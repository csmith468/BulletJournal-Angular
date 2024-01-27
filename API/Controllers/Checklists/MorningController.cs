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
    public class MorningController : BaseApiController {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public MorningController(IUnitOfWork uow, IMapper mapper) {
            _uow = uow;
            _mapper = mapper;
        }

        [HttpPost("add")]
        public async Task<ActionResult<MorningChecklist>> AddMorningChecklist(MorningChecklist morningChecklist) {
            morningChecklist.UserID = User.GetUserId();
            if (await _uow.MorningRepository.DateUsedAsync(morningChecklist.Date, morningChecklist.UserID)) 
                return BadRequest("User already submitted morning checklist for this date.");
            var result = await _uow.MorningRepository.AddAsync(morningChecklist);
            return Ok(result);
        }

        [HttpGet("getMyChecklists")] //?pageNumber=2&pageSize=3
        public async Task<ActionResult<PagedList<MorningChecklist>>> GetMyMorningChecklists([FromQuery]PageParams pageParams) {
            var userId = User.GetUserId();
            var checklists = await _uow.MorningRepository.GetListAsync(userId, pageParams);

            Response.AddPaginationHeader(new PaginationHeader(checklists.CurrentPage, checklists.PageSize, checklists.TotalCount,
                checklists.TotalPages));

            return Ok(checklists);
        }

        [HttpGet("getMyChecklistById/{id}")]
        public async Task<ActionResult<MorningChecklist>> GetMyMorningChecklistById(int id) {
            var userId = User.GetUserId();
            var checklist = await _uow.MorningRepository.GetByIdAsync(userId, id);
            return Ok(checklist);
        }

        [HttpPut("update")]
        public async Task<ActionResult> UpdateMorningChecklist(MorningChecklist morningChecklist) {
            var checklist = await _uow.MorningRepository.GetByIdAsync(User.GetUserId(), morningChecklist.MorningChecklistID);
            if (checklist == null) return NotFound();
            morningChecklist.UserID = User.GetUserId();

            if (checklist.Date != morningChecklist.Date) {
                if (await _uow.MorningRepository.DateUsedAsync(morningChecklist.Date, User.GetUserId())) 
                    return BadRequest("You already submitted a morning entry for this date.");
            }

            _mapper.Map(morningChecklist, checklist);
            if (await _uow.Complete()) return NoContent();

            return BadRequest("Failed to update user.");
        }


        [HttpPut("updateById/{id}")]
        public async Task<ActionResult> UpdateMorningChecklistById(int id, [FromBody]MorningChecklistDto morningChecklistDto) {
            var checklist = await _uow.MorningRepository.GetByIdAsync(User.GetUserId(), id);
            if (checklist == null) return NotFound();

            if (checklist.Date != morningChecklistDto.Date) {
                if (await _uow.MorningRepository.DateUsedAsync(morningChecklistDto.Date, User.GetUserId())) 
                    return BadRequest("You already submitted a morning entry for this date.");
            }

            _mapper.Map(morningChecklistDto, checklist);
            if (await _uow.Complete()) return NoContent();

            return BadRequest("Failed to update user.");
        }
    }
}