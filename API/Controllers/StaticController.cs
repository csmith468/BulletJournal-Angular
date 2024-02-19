using API.Data.Interfaces;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using API.Models.Entities;

// static data that is un-related to any user or checklist type
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

        [HttpGet("getQuestionTypes")]
        public async Task<ActionResult<IEnumerable<QuestionTypes>>> GetQuestionTypes() {
            var questionTypes = await _uow.StaticRepository.GetQuestionTypesAsync();
            if (questionTypes == null) return NotFound();
            return Ok(questionTypes);
        }

        [HttpGet("getChartQuestionTypes")]
        public async Task<ActionResult<IEnumerable<QuestionTypes>>> GetChartQuestionTypes() {
            var questionTypes = await _uow.StaticRepository.GetChartQuestionTypesAsync();
            if (questionTypes == null) return NotFound();
            return Ok(questionTypes);
        }
    }
}