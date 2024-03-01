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
            CreateMap<QuestionPreferencesView, QuestionPreferences>();
            CreateMap<QuestionPreferencesDto, QuestionPreferences>();
            CreateMap<ChecklistTypePreferences, ChecklistTypePreferences>();
            CreateMap<GeneralPreferences, GeneralPreferencesDto>();
            CreateMap<GeneralPreferencesDto, GeneralPreferences>();
                // .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

            // Views with relevant data for each component in the UI
            CreateMap<QuestionPreferencesView, VisibleQuestion_ChartsViewDto>();
            CreateMap<QuestionPreferencesView, VisibleQuestion_ChecklistViewDto>();
            CreateMap<QuestionPreferencesView, VisibleQuestion_TableViewDto>();
            CreateMap<ChecklistTypePreferencesView, VisibleChecklistTypeViewDto>();

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