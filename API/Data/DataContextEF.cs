using System.Data;
using API.Data.Helpers;
using API.Models.Entities;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace API.Data {
    public class DataContextEF: DbContext {

        private readonly IConfiguration _config;

        public DataContextEF(IConfiguration config) {
            _config = config;
        }

        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<TimezoneLocation> TimezoneLocations { get; set; }
        public DbSet<QuestionSet> QuestionSets { get; set; }
        public DbSet<Morning> Mornings { get; set; }
        public DbSet<Night> Nights { get; set; }
        public DbSet<Daily> Dailies { get; set; }
        public DbSet<Wellbeing> Wellbeing { get; set; }
        public DbSet<Physical> Physicals { get; set; }
        public DbSet<Sleep> Sleep { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options) {
            if (!options.IsConfigured) {
                options.UseSqlServer(_config.GetConnectionString("DefaultConnection"),
                    options => options.EnableRetryOnFailure());
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<AppUser>().ToTable("user", "app").HasKey(u => u.UserID);
            modelBuilder.Entity<Morning>().ToTable("morning", "app")
                .HasKey(u => u.MorningID);
            modelBuilder.Entity<Night>().ToTable("night", "app")
                .HasKey(u => u.NightID);
            modelBuilder.Entity<Daily>().ToTable("daily", "app")
                .HasKey(u => u.DailyID);
            modelBuilder.Entity<Wellbeing>().ToTable("wellbeing", "app")
                .HasKey(u => u.WellbeingID);
            modelBuilder.Entity<Physical>().ToTable("physical", "app")
                .HasKey(u => u.PhysicalID);
        modelBuilder.Entity<Sleep>().ToTable("sleep", "app").HasKey(u => u.SleepID);
            modelBuilder.Entity<TimezoneLocation>().ToView("v_timezoneLocation", "dbo")
                .HasKey(u => u.TimezoneLocationID);
            modelBuilder.Entity<QuestionSet>().ToTable("questions", "app")
                .HasKey(u => u.QuestionID);
        }

        protected override void ConfigureConventions(ModelConfigurationBuilder builder) {
            base.ConfigureConventions(builder);
            builder.Properties<DateOnly>().HaveConversion<DateTimeToOnlyConverter>();
        }


    }
}

