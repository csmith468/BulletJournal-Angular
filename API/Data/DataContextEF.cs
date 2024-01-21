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
        public DbSet<SleepRecord> SleepRecords { get; set; }
        public DbSet<MorningChecklist> MorningChecklists { get; set; }
        public DbSet<NightChecklist> NightChecklists { get; set; }
        public DbSet<TimezoneLocation> TimezoneLocations { get; set; }

        // protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
        //     if (!optionsBuilder.IsConfigured) {
        //         optionsBuilder
        //             .UseSqlServer(_config.GetConnectionString("DefaultConnection"),
        //                 optionsBuilder => optionsBuilder.EnableRetryOnFailure());
        //     }
        // }

        protected override void OnConfiguring(DbContextOptionsBuilder options) {
            if (!options.IsConfigured) {
                options.UseSqlServer(_config.GetConnectionString("DefaultConnection"),
                    options => options.EnableRetryOnFailure());
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<AppUser>().ToTable("user", "app").HasKey(u => u.UserID);
            modelBuilder.Entity<SleepRecord>().ToTable("sleep", "app").HasKey(u => u.SleepID);
            modelBuilder.Entity<MorningChecklist>().ToTable("morningChecklist", "app")
                .HasKey(u => u.MorningChecklistID);
            modelBuilder.Entity<NightChecklist>().ToTable("nightChecklist", "app")
                .HasKey(u => u.NightChecklistID);
            modelBuilder.Entity<TimezoneLocation>().ToView("v_timezoneLocation", "dbo")
                .HasKey(u => u.TimezoneLocationID);
        }

        protected override void ConfigureConventions(ModelConfigurationBuilder builder) {
            base.ConfigureConventions(builder);
            builder.Properties<DateOnly>().HaveConversion<DateTimeToOnlyConverter>();
        }

    }
}

