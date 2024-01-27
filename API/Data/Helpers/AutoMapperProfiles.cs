using API.Models.DTOs;
using API.Models.Entities;
using AutoMapper;

namespace API.Data.Helpers {
    public class AutoMapperProfiles : Profile {
        public AutoMapperProfiles() {
            CreateMap<DateTime, DateTime>().ConvertUsing(
                d => DateTime.SpecifyKind(d, DateTimeKind.Utc));

            CreateMap<AppUser, AppUserDto>();
            CreateMap<AppUserUpdateDto, AppUser>();

            CreateMap<MorningChecklist, MorningChecklist>();
            CreateMap<MorningChecklistDto, MorningChecklist>();

            CreateMap<DailyChecklist, DailyChecklist>();
            CreateMap<DailyChecklistDto, DailyChecklist>();
            
            CreateMap<NightChecklist, NightChecklist>();
            CreateMap<NightChecklistDto, NightChecklist>();

            CreateMap<WellbeingTracker, WellbeingTracker>();
            CreateMap<WellbeingTrackerDto, WellbeingTracker>();
            
            CreateMap<PhysicalSymptoms, PhysicalSymptoms>();
            CreateMap<PhysicalSymptomsDto, PhysicalSymptoms>();
        }
    }
}