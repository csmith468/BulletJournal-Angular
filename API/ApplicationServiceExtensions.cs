using API.Data.Interfaces;
using API.Data.Repositories;
using API.Services;
using API.Extensions;
using API.Data.Helpers;

namespace API.Extensions {
    public static class ApplicationServiceExtensions {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config) {
            services.AddCors((options) => {
                options.AddPolicy("client", (corsBuilder) => {
                    corsBuilder.WithOrigins("https://localhost:4200")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                });
            });
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<ISleepRepository, SleepRepository>();
            services.AddScoped<IChecklistRepository, ChecklistRepository>();

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            return services;
        }
    }
}