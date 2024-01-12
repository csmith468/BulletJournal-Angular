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

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            if (!optionsBuilder.IsConfigured) {
                optionsBuilder
                    .UseSqlServer(_config.GetConnectionString("DefaultConnection"),
                        optionsBuilder => optionsBuilder.EnableRetryOnFailure());
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.HasDefaultSchema("bja");

            modelBuilder.Entity<AppUser>().ToTable("user", "bja").HasKey(u => u.UserID);
            modelBuilder.Entity<SleepRecord>().ToTable("sleep", "bja").HasKey(u => u.SleepID);
            modelBuilder.Entity<MorningChecklist>().ToTable("morningChecklist", "bja")
                .HasKey(u => u.MorningChecklistID);
        }

        protected override void ConfigureConventions(ModelConfigurationBuilder builder) {
            base.ConfigureConventions(builder);
            builder.Properties<DateOnly>().HaveConversion<DateOnlyConverter>();
        }

    }
}

