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

            CreateMap<Morning, Morning>();
            CreateMap<Night, Night>();
            CreateMap<Daily, Daily>();
            CreateMap<Wellbeing, Wellbeing>();
            CreateMap<Physical, Physical>();
        }
    }
}