using API.Data.Interfaces;
using Microsoft.AspNetCore.Mvc;
using API.Models.Entities;
using AutoMapper;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using API.Data.Pagination;
using System.Reflection;
using API.Models.DTOs;
using API.Models.Views;

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

        [HttpGet("getMyTables")]
        public async Task<ActionResult<IEnumerable<Tables>>> GetMyTables() {
            var invisibleTables = await _uow.MetadataRepository.GetInvisibleTablesAsync(User.GetUserId());
            var allTables = await _uow.MetadataRepository.GetTablesAsync();

            if (allTables == null) return NotFound();
            if (invisibleTables.Count() >= allTables.Count()) return Ok(allTables);

            var filteredTables = allTables.Where(table => !invisibleTables.Contains(table.key)).ToList();
            return Ok(filteredTables);
        }

        // Chart Questions
        [HttpGet("{type}/getChartQuestions")]
        public async Task<ActionResult<IEnumerable<ChartQuestionsView>>> GetChartQuestions(string type) {
            var chartQuestions = await _uow.MetadataRepository.GetChartQuestionsAsync(User.GetUserId(), type);
            if (chartQuestions == null) return NotFound();
            return Ok(chartQuestions);
        }

        [HttpGet("{type}/getChartQuestionsByKind/{kindId}")]
        public async Task<ActionResult<IEnumerable<ChartQuestionsView>>> GetChartQuestionsByKind(string type, int kindId) {
            var chartQuestions = await _uow.MetadataRepository.GetChartQuestionsByKindAsync(User.GetUserId(), type, kindId);
            if (chartQuestions == null) return NotFound();
            return Ok(chartQuestions);
        }

        // Checklist Questions
        [HttpGet("{type}/getChecklistQuestions")]
        public async Task<ActionResult<IEnumerable<ChartQuestionsView>>> getChecklistQuestions(string type) {
            var checklistQuestions = await _uow.MetadataRepository.GetChecklistQuestionsAsync(User.GetUserId(), type);
            if (checklistQuestions == null) return NotFound();
            return Ok(checklistQuestions);
        }

    }
}