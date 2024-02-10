using API.Data.Interfaces;
using API.Data.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using API.Models.Entities;
using AutoMapper;
using API.Models.DTOs;
using API.Extensions;
using Microsoft.VisualBasic;

namespace API.Controllers
{
    [Authorize] 
    public class UserController : BaseApiController {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public UserController(IUnitOfWork uow, IMapper mapper) {
            _uow = uow;
            _mapper = mapper;
        }

        [HttpPut("update")]
        public async Task<ActionResult> UpdateUser(AppUserUpdateDto appUserUpdateDto) {
            var user = await _uow.AccountRepository.GetAppUserByIdAsync(User.GetUserId());
            if (user == null) return NotFound();

            _mapper.Map(appUserUpdateDto, user);
            if (await _uow.Complete()) return NoContent();

            return BadRequest("Failed to update user.");
        }

        [HttpGet("getQuestionPreferences")]
        public async Task<ActionResult<IEnumerable<QuestionPreferences>>> GetQuestionPreferences() {
            return Ok(await _uow.SettingsRepository.GetQuestionPreferencesAsync(User.GetUserId()));
        }

        [HttpGet("getQuestionPreferencesByType/{type}")]
        public async Task<ActionResult<IEnumerable<QuestionPreferences>>> GetQuestionPreferencesByType(string type) {
            return Ok(await _uow.SettingsRepository.GetQuestionPreferencesByTypeAsync(User.GetUserId(), type));
        }

        [HttpGet("getQuestionPreferencesById/{id}")]
        public async Task<ActionResult<QuestionPreferences>> GetQuestionPreferencesById(int id) {
            return Ok(await _uow.SettingsRepository.GetQuestionPreferencesByIdAsync(User.GetUserId(), id));
        }

        [HttpPut("updateQuestionPreferences")]
        public async Task<ActionResult> UpdateQuestionPreferences(QuestionPreferences questionPrefs) {
            var prefs = await _uow.SettingsRepository.GetQuestionPreferencesByIdAsync(User.GetUserId(), questionPrefs.QuestionPreferencesID);
            if (prefs == null) return NotFound();

            prefs.IsColumnVisible = questionPrefs.IsColumnVisible;
            prefs.UserID = User.GetUserId();
            if (await _uow.Complete()) return NoContent();

            return BadRequest("Failed to update user question preferences.");
        }

        [HttpPut("updateMultipleQuestionPreferences")]
        public async Task<ActionResult> UpdateMultipleQuestionPreferences(List<QuestionPreferencesDto> prefDtos) {
            if (prefDtos == null || !prefDtos.Any()) return BadRequest("Invalid data provided.");

            foreach (QuestionPreferencesDto p in prefDtos) {
                var pref = await _uow.SettingsRepository.GetQuestionPreferencesByIdAsync(User.GetUserId(), p.QuestionPreferencesID);
                if (pref == null) return NotFound();

                pref.IsColumnVisible = p.IsColumnVisible;
                if (!await _uow.Complete()) return BadRequest("Failed to update user question preferences.");
            }

            return NoContent();
        }



        [HttpGet("getTablePreferences")]
        public async Task<ActionResult<IEnumerable<TablePreferences>>> GetTablePreferences() {
            return Ok(await _uow.SettingsRepository.GetTablePreferencesAsync(User.GetUserId()));
        }

        [HttpGet("getTablePreferencesById/{id}")]
        public async Task<ActionResult<TablePreferences>> GetTablePreferencesById(int id) {
            return Ok(await _uow.SettingsRepository.GetTablePreferencesByIdAsync(User.GetUserId(), id));
        }

        [HttpPut("updateTablePreferences")]
        public async Task<ActionResult> UpdateTablePreferences(TablePreferences tablePrefs) {
            var prefs = await _uow.SettingsRepository.GetTablePreferencesByIdAsync(User.GetUserId(), tablePrefs.TablePreferencesID);
            if (prefs == null) return NotFound();

            prefs.IsTableVisible = tablePrefs.IsTableVisible;
            prefs.UserID = User.GetUserId();
            if (await _uow.Complete()) return NoContent();

            return BadRequest("Failed to update user question preferences.");
        }

        [HttpPut("updateMultipleTablePreferences")]
        public async Task<ActionResult> UpdateMultipleTablePreferences(List<TablePreferencesDto> prefDtos) {
            if (prefDtos == null || !prefDtos.Any()) return BadRequest("Invalid data provided.");

            foreach (TablePreferencesDto p in prefDtos) {
                var pref = await _uow.SettingsRepository.GetTablePreferencesByIdAsync(User.GetUserId(), p.TablePreferencesID);
                if (pref == null) return NotFound();

                pref.IsTableVisible = p.IsTableVisible;
                if (!await _uow.Complete()) return BadRequest("Failed to update user question preferences.");
            }

            return NoContent();
        }

        [HttpGet("getTables")]
        public async Task<ActionResult> GetTables() {
            await _uow.ChecklistRepository.GetCompletedChecklistsPerDay(User.GetUserId());
            return Ok(await _uow.SettingsRepository.GetTablesAsync());
        }

        [HttpGet("getMyTables")]
        public async Task<ActionResult> GetMyTables() {
            var invisibleTables = await _uow.SettingsRepository.GetInvisibleTablesAsync(User.GetUserId());
            var allTables = await _uow.SettingsRepository.GetTablesAsync();

            if (allTables == null) return NotFound();
            if (invisibleTables.Count() >= allTables.Count()) return Ok(allTables);

            var filteredTables = allTables.Where(table => !invisibleTables.Contains(table.Key)).ToList();
            return Ok(filteredTables);
        }

        [HttpGet("todoList")]
        public async Task<ActionResult<CompletedChecklists>> GetToDoList() {
            return Ok(await _uow.ChecklistRepository.GetCompletedChecklistsPerDay(User.GetUserId()));
        }
    }
}