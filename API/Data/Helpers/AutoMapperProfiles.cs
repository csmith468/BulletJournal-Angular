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
            CreateMap<NightChecklist, NightChecklist>();
            CreateMap<DailyChecklist, DailyChecklist>();
            CreateMap<WellbeingTracker, WellbeingTracker>();
            CreateMap<PhysicalSymptoms, PhysicalSymptoms>();
        }
    }
}