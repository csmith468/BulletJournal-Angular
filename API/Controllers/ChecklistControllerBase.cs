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
    public class ChecklistControllerBase : BaseApiController {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public ChecklistControllerBase(IUnitOfWork uow, IMapper mapper) {
            _uow = uow;
            _mapper = mapper;
        }

        public async Task<ActionResult<T>> AddChecklist<T>(T checklist) where T : Checklist {
            checklist.UserID = User.GetUserId();
            if (await _uow.ChecklistRepository.DateUsedAsync<T>(checklist.Date, checklist.UserID)) 
                return BadRequest("User already submitted morning checklist for this date.");
            var result = await _uow.ChecklistRepository.AddAsync(checklist);
            return Ok(result);
        }

        public async Task<ActionResult<PagedList<T>>> GetMyChecklists<T>(PageParams pageParams) where T : Checklist {
            var userId = User.GetUserId();
            var checklists = await _uow.ChecklistRepository.GetListAsync<T>(userId, pageParams);

            Response.AddPaginationHeader(new PaginationHeader(checklists.CurrentPage, checklists.PageSize, checklists.TotalCount,
                checklists.TotalPages));

            return Ok(checklists);
        }

        public async Task<ActionResult<T>> GetMyChecklistById<T>(int id) where T : Checklist {
            var userId = User.GetUserId();
            var checklist = await _uow.ChecklistRepository.GetByIdAsync<T>(userId, id);
            return Ok(checklist);
        }

        public async Task<ActionResult> UpdateChecklist<T>(T inputChecklist) where T : Checklist {
            var checklist = await _uow.ChecklistRepository.GetByIdAsync<T>(User.GetUserId(), inputChecklist.GetID());
            if (checklist == null) return NotFound();
            inputChecklist.UserID = User.GetUserId();

            if (checklist.Date != inputChecklist.Date) {
                if (await _uow.ChecklistRepository.DateUsedAsync<T>(inputChecklist.Date, User.GetUserId())) 
                    return BadRequest("You already submitted a morning entry for this date.");
            }

            _mapper.Map(inputChecklist, checklist);
            if (await _uow.Complete()) return NoContent();

            return BadRequest("Failed to update user.");
        }
    }
}