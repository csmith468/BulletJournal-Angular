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

        [HttpGet("{type}/getQuestionSet")]
        public async Task<ActionResult<IEnumerable<QuestionSetDto>>> GetQuestionSet(string type) {
            var questionSet = await _uow.MetadataRepository.GetQuestionSetAsync(User.GetUserId(), type);
            if (questionSet == null) return NotFound();
            return Ok(questionSet);
        }

        [HttpGet("getChartQuestions")]
        public async Task<ActionResult<IEnumerable<ChartQuestionsView>>> GetChartQuestions() {
            var chartQuestions = await _uow.MetadataRepository.GetChartQuestionsAsync(User.GetUserId());
            if (chartQuestions == null) return NotFound();
            return Ok(chartQuestions);
        }


        [HttpGet("{type}/getChartQuestionsByType")]
        public async Task<ActionResult<IEnumerable<ChartQuestionsView>>> getChartQuestionsByType(string type) {
            var chartQuestions = await _uow.MetadataRepository.GetChartQuestionsByTypeAsync(User.GetUserId(), type);
            if (chartQuestions == null) return NotFound();
            return Ok(chartQuestions);
        }
        

        [HttpGet("getChartQuestionsByKindId/{kindId}")]
        public async Task<ActionResult<IEnumerable<ChartQuestionsView>>> GetChartQuestionsByKindId(int kindId) {
            var chartQuestions = await _uow.MetadataRepository.GetChartQuestionsByKindIdAsync(User.GetUserId(), kindId);
            if (chartQuestions == null) return NotFound();
            return Ok(chartQuestions);
        }

        [HttpGet("{type}/getChartQuestionsByTypeAndKindId/{kindId}")]
        public async Task<ActionResult<IEnumerable<ChartQuestionsView>>> GetChartQuestionsByKindId(string type, int kindId) {
            var chartQuestions = await _uow.MetadataRepository.GetChartQuestionsByTypeAndKindIdAsync(User.GetUserId(), type, kindId);
            if (chartQuestions == null) return NotFound();
            return Ok(chartQuestions);
        }

    }
}