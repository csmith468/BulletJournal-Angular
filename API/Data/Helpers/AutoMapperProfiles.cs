using API.Models.DTOs;
using API.Models.Entities;
using API.Models.Views;
using AutoMapper;

namespace API.Data.Helpers {
    public class AutoMapperProfiles : Profile {
        public AutoMapperProfiles() {
            CreateMap<DateTime, DateTime>().ConvertUsing(
                d => DateTime.SpecifyKind(d, DateTimeKind.Utc));

            CreateMap<AppUser, AppUserDto>();
            CreateMap<AppUserUpdateDto, AppUser>();
            CreateMap<QuestionPreferences, QuestionPreferences>();
            CreateMap<TablePreferences, TablePreferences>();
            CreateMap<QuestionPreferences, QuestionPreferencesDto>();
            CreateMap<ChartQuestionsView, ChartQuestionsViewDto>();
            CreateMap<ChecklistQuestionsView, ChecklistQuestionsViewDto>();


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