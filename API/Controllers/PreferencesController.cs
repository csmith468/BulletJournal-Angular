using API.Data.Interfaces;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using API.Extensions;
using API.Models.Tables.Entities;
using API.Models.Tables.DTOs;
using API.Models.Views.Entities;

// everything is related to user preferences for questions/checklist types
namespace API.Controllers
{
    [Authorize] 
    public class PreferencesController : BaseApiController {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public PreferencesController(IUnitOfWork uow, IMapper mapper) {
            _uow = uow;
            _mapper = mapper;
        }

        [HttpGet("questions/getPreferences")]
        public async Task<ActionResult<IEnumerable<QuestionPreferencesView>>> GetQuestionPreferences() {
            return Ok(await _uow.PreferencesRepository.GetQuestionPreferencesViewAsync(User.GetUserId()));
        }

        [HttpGet("questions/getPreferencesByType/{type}")]
        public async Task<ActionResult<IEnumerable<QuestionPreferencesView>>> GetQuestionPreferencesByType(string type) {
            return Ok(await _uow.PreferencesRepository.GetQuestionPreferencesViewByTypeAsync(User.GetUserId(), type));
        }

        [HttpGet("questions/getPreferencesById/{id}")]
        public async Task<ActionResult<QuestionPreferencesView>> GetQuestionPreferencesById(int id) {
            return Ok(await _uow.PreferencesRepository.GetQuestionPreferencesViewByIdAsync(User.GetUserId(), id));
        }

        [HttpPut("questions/updatePreferences")]
        public async Task<ActionResult> UpdateQuestionPreferences(QuestionPreferencesDto questionPrefs) {
            var prefs = await _uow.PreferencesRepository.GetQuestionPreferencesByIdAsync(User.GetUserId(), questionPrefs.questionPreferencesID);
            if (prefs == null) return NotFound();

            prefs.isVisible = questionPrefs.isVisible;
            prefs.userID = User.GetUserId();
            if (await _uow.Complete()) return NoContent();

            return BadRequest("Failed to update user question preferences.");
        }

        [HttpPut("questions/updateMultiplePreferences")]
        public async Task<ActionResult> UpdateMultipleQuestionPreferences(List<QuestionPreferencesDto> prefDtos) {
            if (prefDtos == null || !prefDtos.Any()) return BadRequest("Invalid data provided.");

            foreach (QuestionPreferencesDto p in prefDtos) {
                var pref = await _uow.PreferencesRepository.GetQuestionPreferencesByIdAsync(User.GetUserId(), p.questionPreferencesID);
                if (pref == null) return NotFound();

                pref.isVisible = p.isVisible;
                if (!await _uow.Complete()) return BadRequest("Failed to update user question preferences.");
            }

            return NoContent();
        }

        [HttpGet("checklistTypes/getPreferences")]
        public async Task<ActionResult<IEnumerable<ChecklistTypePreferences>>> GetTablePreferences() {
            return Ok(await _uow.PreferencesRepository.GetChecklistTypePreferencesViewAsync(User.GetUserId()));
        }

        [HttpGet("checklistTypes/getPreferencesById/{id}")]
        public async Task<ActionResult<ChecklistTypePreferences>> GetTablePreferencesById(int id) {
            return Ok(await _uow.PreferencesRepository.GetChecklistTypePreferencesViewByIdAsync(User.GetUserId(), id));
        }

        [HttpPut("checklistTypes/updatePreferences")]
        public async Task<ActionResult> UpdateTablePreferences(ChecklistTypePreferences checklistTypePrefs) {
            var prefs = await _uow.PreferencesRepository.GetChecklistTypePreferencesByIdAsync(User.GetUserId(), checklistTypePrefs.checklistTypePreferencesID);
            if (prefs == null) return NotFound();

            prefs.isVisible = checklistTypePrefs.isVisible;
            prefs.userID = User.GetUserId();
            if (await _uow.Complete()) return NoContent();

            return BadRequest("Failed to update user checklist type preferences.");
        }

        [HttpPut("checklistTypes/updateMultiplePreferences")]
        public async Task<ActionResult> UpdateMultipleTablePreferences(List<ChecklistTypePreferences> prefDtos) {
            if (prefDtos == null || !prefDtos.Any()) return BadRequest("Invalid data provided.");

            foreach (ChecklistTypePreferences p in prefDtos) {
                var pref = await _uow.PreferencesRepository.GetChecklistTypePreferencesByIdAsync(User.GetUserId(), p.checklistTypePreferencesID);
                if (pref == null) return NotFound();

                pref.isVisible = p.isVisible;
                if (!await _uow.Complete()) return BadRequest("Failed to update user checklist type preferences.");
            }

            return NoContent();
        }
    }
}