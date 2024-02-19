using API.Data.Interfaces;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using API.Models.Entities;

// static data that is un-related to any user or user data
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

        [HttpGet("timezones")]
        public async Task<ActionResult<IEnumerable<TimezoneLocation>>> GetTimezoneLocation() {
            return Ok(await _uow.StaticRepository.GetTimezoneLocationsAsync());
        }

        [HttpGet("timezone/{id}")]
        public async Task<ActionResult<TimezoneLocation>> GetTimezoneById(int id) {
            return Ok(await _uow.StaticRepository.GetTimezoneLocationByIDAsync(id));
        }


        [HttpGet("getQuestionKinds")]
        public async Task<ActionResult<IEnumerable<QuestionKinds>>> GetQuestionKinds() {
            var questionKinds = await _uow.StaticRepository.GetQuestionKindsAsync();
            if (questionKinds == null) return NotFound();
            return Ok(questionKinds);
        }

        [HttpGet("getChartQuestionKinds")]
        public async Task<ActionResult<IEnumerable<QuestionKinds>>> GetChartQuestionKinds() {
            var questionKinds = await _uow.StaticRepository.GetChartQuestionKindsAsync();
            if (questionKinds == null) return NotFound();
            return Ok(questionKinds);
        }

        [HttpGet("getQuestionKindById/{id}")]
        public async Task<ActionResult<IEnumerable<QuestionKinds>>> GetChartQuestionKindById(int id) {
            var questionKind = await _uow.StaticRepository.GetQuestionKindByIdAsync(id);
            if (questionKind == null) return NotFound();
            return Ok(questionKind);
        }
    }
}