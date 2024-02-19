using API.Data.Interfaces;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using API.Models.Entities;
using API.Extensions;
using API.Models.DTOs;

// everything is related to user preferences for questions/tables
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
        public async Task<ActionResult<IEnumerable<QuestionPreferences>>> GetQuestionPreferences() {
            return Ok(await _uow.PreferencesRepository.GetQuestionPreferencesAsync(User.GetUserId()));
        }

        [HttpGet("questions/getPreferencesByType/{type}")]
        public async Task<ActionResult<IEnumerable<QuestionPreferences>>> GetQuestionPreferencesByType(string type) {
            return Ok(await _uow.PreferencesRepository.GetQuestionPreferencesByTypeAsync(User.GetUserId(), type));
        }

        [HttpGet("questions/getPreferencesById/{id}")]
        public async Task<ActionResult<QuestionPreferences>> GetQuestionPreferencesById(int id) {
            return Ok(await _uow.PreferencesRepository.GetQuestionPreferencesByIdAsync(User.GetUserId(), id));
        }

        [HttpPut("questions/updatePreferences")]
        public async Task<ActionResult> UpdateQuestionPreferences(QuestionPreferences questionPrefs) {
            var prefs = await _uow.PreferencesRepository.GetQuestionPreferencesByIdAsync(User.GetUserId(), questionPrefs.questionPreferencesID);
            if (prefs == null) return NotFound();

            prefs.isQuestionVisible = questionPrefs.isQuestionVisible;
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

                pref.isQuestionVisible = p.isQuestionVisible;
                if (!await _uow.Complete()) return BadRequest("Failed to update user question preferences.");
            }

            return NoContent();
        }

        [HttpGet("tables/getPreferences")]
        public async Task<ActionResult<IEnumerable<TablePreferences>>> GetTablePreferences() {
            return Ok(await _uow.PreferencesRepository.GetTablePreferencesAsync(User.GetUserId()));
        }

        [HttpGet("tables/getPreferencesById/{id}")]
        public async Task<ActionResult<TablePreferences>> GetTablePreferencesById(int id) {
            return Ok(await _uow.PreferencesRepository.GetTablePreferencesByIdAsync(User.GetUserId(), id));
        }

        [HttpPut("tables/updatePreferences")]
        public async Task<ActionResult> UpdateTablePreferences(TablePreferences tablePrefs) {
            var prefs = await _uow.PreferencesRepository.GetTablePreferencesByIdAsync(User.GetUserId(), tablePrefs.tablePreferencesID);
            if (prefs == null) return NotFound();

            prefs.isTableVisible = tablePrefs.isTableVisible;
            prefs.userID = User.GetUserId();
            if (await _uow.Complete()) return NoContent();

            return BadRequest("Failed to update user question preferences.");
        }

        [HttpPut("tables/updateMultiplePreferences")]
        public async Task<ActionResult> UpdateMultipleTablePreferences(List<TablePreferencesDto> prefDtos) {
            if (prefDtos == null || !prefDtos.Any()) return BadRequest("Invalid data provided.");

            foreach (TablePreferencesDto p in prefDtos) {
                var pref = await _uow.PreferencesRepository.GetTablePreferencesByIdAsync(User.GetUserId(), p.tablePreferencesID);
                if (pref == null) return NotFound();

                pref.isTableVisible = p.isTableVisible;
                if (!await _uow.Complete()) return BadRequest("Failed to update user question preferences.");
            }

            return NoContent();
        }
    }
}