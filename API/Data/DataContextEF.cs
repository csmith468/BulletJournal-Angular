using System.Data;
using API.Data.Helpers;
using API.Models.Entities;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace API.Data {
    public class DataContextEF: DbContext {

        private readonly IConfiguration _config;
        private readonly IDbConnection _dbConnection;

        public DataContextEF(IConfiguration config) {
            _config = config;
            _dbConnection = new SqlConnection(
                config.GetConnectionString("DefaultConnection")
            );
        }

        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<SleepRecord> SleepRecords { get; set; }
        public DbSet<MorningChecklist> MorningChecklists { get; set; }
        public DbSet<NightChecklist> NightChecklists { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            if (!optionsBuilder.IsConfigured) {
                optionsBuilder
                    .UseSqlServer(_config.GetConnectionString("DefaultConnection"),
                        optionsBuilder => optionsBuilder.EnableRetryOnFailure());
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<AppUser>().ToTable("user", "app").HasKey(u => u.UserID);
            modelBuilder.Entity<SleepRecord>().ToTable("sleep", "app").HasKey(u => u.SleepID);
            modelBuilder.Entity<MorningChecklist>().ToTable("morningChecklist", "app")
                .HasKey(u => u.MorningChecklistID);
            modelBuilder.Entity<NightChecklist>().ToTable("nightChecklist", "app")
                .HasKey(u => u.NightChecklistID);
        }

        protected override void ConfigureConventions(ModelConfigurationBuilder builder) {
            base.ConfigureConventions(builder);
            builder.Properties<DateOnly>().HaveConversion<DateTimeToOnlyConverter>();
        }

    }
}

