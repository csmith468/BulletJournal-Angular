using API.Models.Tables.DTOs;
using API.Models.Tables.Entities;
using API.Models.Views.DTOs;
using API.Models.Views.Entities;
using AutoMapper;

namespace API.Data.Helpers
{
    public class AutoMapperProfiles : Profile {
        public AutoMapperProfiles() {
            CreateMap<DateTime, DateTime>().ConvertUsing(
                d => DateTime.SpecifyKind(d, DateTimeKind.Utc));

            CreateMap<AppUser, AppUserDto>();
            CreateMap<AppUserUpdateDto, AppUser>();
            CreateMap<QuestionPreferences, QuestionPreferences>();
            CreateMap<TablePreferences, TablePreferences>();
            CreateMap<QuestionPreferences, QuestionPreferencesDto>();

            // Views with relevant data for each component in the UI
            CreateMap<QuestionView, ChartQuestionViewDto>();
            CreateMap<QuestionView, ChecklistQuestionViewDto>();
            CreateMap<QuestionView, TableQuestionViewDto>();
            CreateMap<TableTypeView, TableTypeLayoutDto>();

            CreateMap<Checklist, Checklist>();
            
            CreateMap<Morning, Morning>();
            CreateMap<Night, Night>();
            CreateMap<Daily, Daily>();
            CreateMap<Wellbeing, Wellbeing>();
            CreateMap<Physical, Physical>();

            CreateMap<SpendingFinancial, SpendingFinancial>();
            CreateMap<SpendingHealthcare, SpendingHealthcare>();
            CreateMap<SpendingPersonal, SpendingPersonal>();
            CreateMap<SpendingRegular, SpendingRegular>();

            CreateMap<Checklist, Morning>();
            CreateMap<Checklist, Night>();
            CreateMap<Checklist, Daily>();
            CreateMap<Checklist, Wellbeing>();
            CreateMap<Checklist, Physical>();

            CreateMap<Checklist, SpendingFinancial>();
            CreateMap<Checklist, SpendingHealthcare>();
            CreateMap<Checklist, SpendingPersonal>();
            CreateMap<Checklist, SpendingRegular>();

            CreateMap<Morning, Checklist>();
            CreateMap<Night, Checklist>();
            CreateMap<Daily, Checklist>();
            CreateMap<Wellbeing, Checklist>();
            CreateMap<Physical, Checklist>();

            CreateMap<SpendingFinancial, Checklist>();
            CreateMap<SpendingHealthcare, Checklist>();
            CreateMap<SpendingPersonal, Checklist>();
            CreateMap<SpendingRegular, Checklist>();
        }
    }
}