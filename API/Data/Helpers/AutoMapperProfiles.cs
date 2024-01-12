using API.Models.DTOs;
using API.Models.Entities;
using AutoMapper;

namespace API.Data.Helpers {
    public class AutoMapperProfiles : Profile {
        public AutoMapperProfiles() {
            CreateMap<AppUser, AppUserDto>();
            CreateMap<SleepRecord, SleepRecordDto>();
            CreateMap<DateTime, DateTime>().ConvertUsing(
                d => DateTime.SpecifyKind(d, DateTimeKind.Utc));
        }
    }
}