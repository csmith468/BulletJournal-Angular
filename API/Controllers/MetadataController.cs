using API.Data.Interfaces;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using API.Models.Views.DTOs;
using API.Models.Views.Entities;
using API.Models.Tables.Entities;

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

        [HttpGet("getVisibleChecklistTypes")]
        public async Task<ActionResult<IEnumerable<VisibleChecklistTypeViewDto>>> GetVisibleChecklistTypes() {
            var tableTypes = await _uow.MetadataRepository.GetVisibleChecklistTypeAsync(User.GetUserId());
            if (tableTypes == null) return NotFound();
            return Ok(tableTypes.Select(q => _mapper.Map<ChecklistTypePreferencesView, VisibleChecklistTypeViewDto>(q)).ToList());
        }

        // Chart Questions
        [HttpGet("{type}/getChartQuestions")]
        public async Task<ActionResult<IEnumerable<VisibleQuestion_ChartsViewDto>>> GetChartQuestions(string type) {
            var chartQuestions = await _uow.MetadataRepository.GetVisibleQuestionsAsync(User.GetUserId(), type, true, null);
            if (chartQuestions == null) return NotFound();
            return Ok(chartQuestions.Select(q => _mapper.Map<QuestionPreferencesView, VisibleQuestion_ChartsViewDto>(q)).ToList());
        }

        [HttpGet("{type}/getChartQuestionsByKind/{kindId}")]
        public async Task<ActionResult<IEnumerable<VisibleQuestion_ChartsViewDto>>> GetChartQuestionsByKind(string type, int kindId) {
            var chartQuestions = await _uow.MetadataRepository.GetVisibleQuestionsAsync(User.GetUserId(), type, true, kindId);
            if (chartQuestions == null) return NotFound();
            return Ok(chartQuestions.Select(q => _mapper.Map<QuestionPreferencesView, VisibleQuestion_ChartsViewDto>(q)).ToList());
        }

        // Checklist Questions
        [HttpGet("{type}/getChecklistQuestions")]
        public async Task<ActionResult<IEnumerable<VisibleQuestion_ChecklistViewDto>>> GetChecklistQuestions(string type) {
            var checklistQuestions = await _uow.MetadataRepository.GetVisibleQuestionsAsync(User.GetUserId(), type, false, null);
            if (checklistQuestions == null) return NotFound();
            return Ok(checklistQuestions.Select(q => _mapper.Map<QuestionPreferencesView, VisibleQuestion_ChecklistViewDto>(q)).ToList());
        }

        [HttpGet("{type}/getTableQuestions")]
        public async Task<ActionResult<IEnumerable<VisibleQuestion_TableViewDto>>> GetTableQuestions(string type) {
            var tableQuestions = await _uow.MetadataRepository.GetVisibleQuestionsAsync(User.GetUserId(), type, false, null);
            if (tableQuestions == null) return NotFound();
            return Ok(tableQuestions.Select(q => _mapper.Map<QuestionPreferencesView, VisibleQuestion_TableViewDto>(q)).ToList());
        }

        [HttpGet("getCompletedToday")]
        public async Task<ActionResult<CompletedChecklists>> GetToDoList() {
            return Ok(await _uow.MetadataRepository.GetCompletedChecklistsPerDay(User.GetUserId()));
        }

    }
}