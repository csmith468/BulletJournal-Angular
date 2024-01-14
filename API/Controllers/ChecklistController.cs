using API.Data;
using API.Data.Interfaces;
using API.Data.Repositories;
using Microsoft.AspNetCore.Mvc;
using API.Models.Entities;
using AutoMapper;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Authorize]
    public class ChecklistController : BaseApiController {
        private readonly IUnitOfWork _uow;
        private readonly DataContextEF _contextEF;
        private readonly IMapper _mapper;

        public ChecklistController(IConfiguration config, IUnitOfWork uow, IMapper mapper) {
            _uow = new UnitOfWork(config);
            _contextEF = new DataContextEF(config);
            _mapper = mapper;
        }

        [HttpPost("addMorning")]
        public async Task<ActionResult<MorningChecklist>> AddMorningChecklist(MorningChecklist morningChecklist) {
            morningChecklist.UserID = User.GetUserId();
            if (await _uow.ChecklistRepository.MorningDateUsedAsync(morningChecklist.Date, morningChecklist.UserID)) 
                return BadRequest("User already submitted morning checklist for this date.");
            var result = await _uow.ChecklistRepository.AddMorningChecklistAsync(morningChecklist);
            return Ok(result);
        }

        [HttpPost("addNight")]
        public async Task<ActionResult<NightChecklist>> AddNightChecklist(NightChecklist nightChecklist) {
            nightChecklist.UserID = User.GetUserId();
            if (await _uow.ChecklistRepository.NightDateUsedAsync(nightChecklist.Date, nightChecklist.UserID)) 
                return BadRequest("User already submitted morning checklist for this date.");
            var result = await _uow.ChecklistRepository.AddNightChecklistAsync(nightChecklist);
            return Ok(result);
        }

        [HttpGet("getMyMorningChecklists")]
        public async Task<ActionResult<IEnumerable<MorningChecklist>>> GetMyMorningChecklists() {
            var userId = User.GetUserId();
            var checklists = await _uow.ChecklistRepository.GetMyMorningChecklistsAsync(userId);
            return Ok(checklists);
        }

        [HttpGet("getMyNightChecklists")]
        public async Task<ActionResult<IEnumerable<NightChecklist>>> GetMyNightChecklists() {
            var userId = User.GetUserId();
            var checklists = await _uow.ChecklistRepository.GetMyNightChecklistsAsync(userId);
            return Ok(checklists);
        }

        [HttpGet("getMyMorningChecklistById/{id}")]
        public async Task<ActionResult<MorningChecklist>> GetMyMorningChecklistById(int id) {
            var userId = User.GetUserId();
            var checklist = await _uow.ChecklistRepository.GetMyMorningChecklistByIdAsync(userId, id);
            return Ok(checklist);
        }

        [HttpGet("getMyNightChecklistById/{id}")]
        public async Task<ActionResult<NightChecklist>> GetMyNightChecklistById(int id) {
            var userId = User.GetUserId();
            var checklist = await _uow.ChecklistRepository.GetMyNightChecklistByIdAsync(userId, id);
            return Ok(checklist);
        }


    }
}