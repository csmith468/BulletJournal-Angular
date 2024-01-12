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
            var result = await _uow.ChecklistRepository.AddMorningChecklist(morningChecklist);
            return Ok(result);
        }

        [HttpPost("addNight")]
        public async Task<ActionResult<MorningChecklist>> AddNightChecklist(NightChecklist nightChecklist) {
            nightChecklist.UserID = User.GetUserId();
            var result = await _uow.ChecklistRepository.AddNightChecklist(nightChecklist);
            return Ok(result);
        }

    }
}