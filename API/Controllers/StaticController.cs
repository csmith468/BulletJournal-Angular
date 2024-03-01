using API.Data.Interfaces;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using API.Models.Views.Entities;

// static data that is un-related to any user or user data (only getters)
namespace API.Controllers
{
    [Authorize] 
    public class StaticController : BaseApiController {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public StaticController(IUnitOfWork uow, IMapper mapper) {
            _uow = uow;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpGet("timezones")]
        public async Task<ActionResult<IEnumerable<TimezoneLocationView>>> GetTimezoneLocation() {
            return Ok(await _uow.StaticRepository.GetTimezoneLocationsAsync());
        }

        [AllowAnonymous]
        [HttpGet("timezone/{id}")]
        public async Task<ActionResult<TimezoneLocationView>> GetTimezoneById(int id) {
            return Ok(await _uow.StaticRepository.GetTimezoneLocationByIDAsync(id));
        }


        [HttpGet("getQuestionKinds")]
        public async Task<ActionResult<IEnumerable<QuestionKindView>>> GetQuestionKinds() {
            var questionKinds = await _uow.StaticRepository.GetQuestionKindsAsync();
            if (questionKinds == null) return NotFound();
            return Ok(questionKinds);
        }

        [HttpGet("getChartQuestionKinds")]
        public async Task<ActionResult<IEnumerable<QuestionKindView>>> GetChartQuestionKinds() {
            var questionKinds = await _uow.StaticRepository.GetChartQuestionKindsAsync();
            if (questionKinds == null) return NotFound();
            return Ok(questionKinds);
        }

        [HttpGet("getQuestionKindById/{id}")]
        public async Task<ActionResult<IEnumerable<QuestionKindView>>> GetChartQuestionKindById(int id) {
            var questionKind = await _uow.StaticRepository.GetQuestionKindByIdAsync(id);
            if (questionKind == null) return NotFound();
            return Ok(questionKind);
        }
    }
}