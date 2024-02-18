using API.Data.Helpers;
using API.Models.DTOs;
using API.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContextEF: DbContext {
        private readonly IConfiguration _config;

        public DataContextEF(IConfiguration config) {
            _config = config;
        }

        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<QuestionPreferences> QuestionPreferences { get; set; }
        public DbSet<TablePreferences> TablePreferences { get; set; }
        public DbSet<TimezoneLocation> TimezoneLocations { get; set; }
        public DbSet<Tables> Tables { get; set; }
        
        public DbSet<Morning> Morning { get; set; }
        public DbSet<Night> Night { get; set; }
        public DbSet<Daily> Daily { get; set; }
        public DbSet<Wellbeing> Wellbeing { get; set; }
        public DbSet<Physical> Physical { get; set; }
        // public DbSet<Sleep> Sleep { get; set; }

        public DbSet<SpendingFinancial> SpendingFinancial { get; set; }
        public DbSet<SpendingHealthcare> SpendingHealthcare { get; set; }
        public DbSet<SpendingPersonal> SpendingPersonal { get; set; }
        public DbSet<SpendingRegular> SpendingRegular { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder options) {
            if (!options.IsConfigured) {
                options.UseSqlServer(_config.GetConnectionString("DefaultConnection"),
                    options => options.EnableRetryOnFailure());
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<AppUser>().ToTable("user", "app_sys").HasKey(u => u.UserID);
            modelBuilder.Entity<QuestionPreferences>().ToTable("questionPreferences", "app_sys")
                .HasKey(u => u.QuestionPreferencesID);
            modelBuilder.Entity<TablePreferences>().ToTable("tablePreferences", "app_sys")
                .HasKey(u => u.TablePreferencesID);
            modelBuilder.Entity<QuestionTypes>().ToTable("questionTypes", "app_sys")
                .HasKey(u => u.QuestionTypeID);
            modelBuilder.Entity<Tables>().ToTable("tables", "app_sys")
                .HasKey(u => u.TableID);

            modelBuilder.Entity<Morning>().ToTable("morning", "app")
                .HasKey(u => u.id);
            modelBuilder.Entity<Night>().ToTable("night", "app")
                .HasKey(u => u.id);
            modelBuilder.Entity<Daily>().ToTable("daily", "app")
                .HasKey(u => u.id);
            modelBuilder.Entity<Wellbeing>().ToTable("wellbeing", "app")
                .HasKey(u => u.id);
            modelBuilder.Entity<Physical>().ToTable("physical", "app")
                .HasKey(u => u.id);

            modelBuilder.Entity<SpendingFinancial>().ToTable("spendingFinancial", "app")
                .HasKey(u => u.id);
            modelBuilder.Entity<SpendingHealthcare>().ToTable("spendingHealthcare", "app")
                .HasKey(u => u.id);
            modelBuilder.Entity<SpendingPersonal>().ToTable("spendingPersonal", "app")
                .HasKey(u => u.id);
            modelBuilder.Entity<SpendingRegular>().ToTable("spendingRegular", "app")
                .HasKey(u => u.id);
            // modelBuilder.Entity<Sleep>().ToTable("sleep", "app").HasKey(u => u.SleepID);

            modelBuilder.Entity<TimezoneLocation>().ToView("v_timezoneLocation", "dbo")
                .HasKey(u => u.TimezoneLocationID);
        }

        protected override void ConfigureConventions(ModelConfigurationBuilder builder) {
            base.ConfigureConventions(builder);
            builder.Properties<DateOnly>().HaveConversion<DateTimeToOnlyConverter>();
        }


    }
}

