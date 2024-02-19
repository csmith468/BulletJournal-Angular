using API.Data.Interfaces;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using API.Models.Views.DTOs;

// getting data about tables/questions for user but not data within them
namespace API.Controllers
{
    [Authorize]
    public class MetadataController : BaseApiController {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public MetadataController(IUnitOfWork uow, IMapper mapper) {
            _uow = uow;
            _mapper = mapper;
        }

        [HttpGet("getTableTypeLayout")]
        public async Task<ActionResult<IEnumerable<TableTypeLayoutDto>>> GetTableTypeLayout() {
            var tableTypes = await _uow.MetadataRepository.GetTableTypeLayoutAsync(User.GetUserId());
            if (tableTypes == null) return NotFound();
            return Ok(tableTypes);
        }

        // Chart Questions
        [HttpGet("{type}/getChartQuestions")]
        public async Task<ActionResult<IEnumerable<ChartQuestionViewDto>>> GetChartQuestions(string type) {
            var chartQuestions = await _uow.MetadataRepository.GetChartQuestionsAsync(User.GetUserId(), type);
            if (chartQuestions == null) return NotFound();
            return Ok(chartQuestions);
        }

        [HttpGet("{type}/getChartQuestionsByKind/{kindId}")]
        public async Task<ActionResult<IEnumerable<ChartQuestionViewDto>>> GetChartQuestionsByKind(string type, int kindId) {
            var chartQuestions = await _uow.MetadataRepository.GetChartQuestionsByKindAsync(User.GetUserId(), type, kindId);
            if (chartQuestions == null) return NotFound();
            return Ok(chartQuestions);
        }

        // Checklist Questions
        [HttpGet("{type}/getChecklistQuestions")]
        public async Task<ActionResult<IEnumerable<ChecklistQuestionViewDto>>> getChecklistQuestions(string type) {
            var checklistQuestions = await _uow.MetadataRepository.GetChecklistQuestionsAsync(User.GetUserId(), type);
            if (checklistQuestions == null) return NotFound();
            return Ok(checklistQuestions);
        }

    }
}