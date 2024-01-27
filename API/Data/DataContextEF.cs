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
        public DbSet<MorningChecklist> MorningChecklists { get; set; }
        public DbSet<NightChecklist> NightChecklists { get; set; }
        public DbSet<DailyChecklist> DailyChecklists { get; set; }
        public DbSet<WellbeingTracker> WellbeingTrackers { get; set; }
        public DbSet<PhysicalSymptoms> PhysicalSymptoms { get; set; }
        public DbSet<SleepRecord> SleepRecords { get; set; }

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
            modelBuilder.Entity<DailyChecklist>().ToTable("dailyChecklist", "app")
                .HasKey(u => u.DailyChecklistID);
            modelBuilder.Entity<WellbeingTracker>().ToTable("wellbeingTracker", "app")
                .HasKey(u => u.WellbeingTrackerID);
            modelBuilder.Entity<PhysicalSymptoms>().ToTable("physicalSymptoms", "app")
                .HasKey(u => u.PhysicalSymptomsID);
            modelBuilder.Entity<TimezoneLocation>().ToView("v_timezoneLocation", "dbo")
                .HasKey(u => u.TimezoneLocationID);
        }

        protected override void ConfigureConventions(ModelConfigurationBuilder builder) {
            base.ConfigureConventions(builder);
            builder.Properties<DateOnly>().HaveConversion<DateTimeToOnlyConverter>();
        }

    }
}

