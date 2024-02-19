using API.Data.Interfaces;
using Microsoft.AspNetCore.Mvc;
using API.Models.Entities;
using AutoMapper;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using API.Data.Pagination;
using System.Reflection;
using API.Models.DTOs;

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
            var allTables = await _uow.StaticRepository.GetTablesAsync();

            if (allTables == null) return NotFound();
            if (invisibleTables.Count() >= allTables.Count()) return Ok(allTables);

            var filteredTables = allTables.Where(table => !invisibleTables.Contains(table.key)).ToList();
            return Ok(filteredTables);
        }

        [HttpGet("{type}/getQuestionSet")]
        public async Task<ActionResult<IEnumerable<QuestionSetDto>>> GetQuestionSet(string type) {
            var userID = User.GetUserId();
            var questionSet = await _uow.MetadataRepository.GetQuestionSetAsync(userID, type);
            if (questionSet == null) return NotFound();
            return Ok(questionSet);
        }
    }
}