using API.Data.Helpers;
using API.Models.Entities;
using API.Models.Views;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContextEF: DbContext {
        private readonly IConfiguration _config;

        public DataContextEF(IConfiguration config) {
            _config = config;
        }

        // Metadata tables/views related to user 
        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<QuestionPreferences> QuestionPreferences { get; set; }
        public DbSet<TablePreferences> TablePreferences { get; set; }
        // public DbSet<HiddenQuestions> HiddenQuestions { get; set; }

        public DbSet<ChartQuestionsView> ChartQuestionsView { get; set; }
        public DbSet<ChecklistQuestionsView> ChecklistQuestionsView { get; set; }


        // Static tables/views
        public DbSet<QuestionKinds> QuestionKinds { get; set; }
        public DbSet<Tables> Tables { get; set; }
        public DbSet<TimezoneLocationView> TimezoneLocationsView { get; set; }
        
        // Checklist data
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

            // Metadata tables related to user 
            modelBuilder.Entity<AppUser>().ToTable("user", "app")
                .HasKey(u => u.userID);
            modelBuilder.Entity<QuestionPreferences>().ToTable("questionPreferences", "app")
                .HasKey(u => u.questionPreferencesID);
            modelBuilder.Entity<TablePreferences>().ToTable("tablePreferences", "app")
                .HasKey(u => u.tablePreferencesID);
            // modelBuilder.Entity<HiddenQuestions>().ToTable("hiddenQuestions", "app")
            //     .HasKey(u => u.hiddenQuestionID);

            // Metadata views related to user
            modelBuilder.Entity<ChartQuestionsView>().ToView("v_chartQuestions", "app")
                .HasKey(q => q.questionPreferencesId);
            modelBuilder.Entity<ChecklistQuestionsView>().ToView("v_checklistQuestions", "app")
                .HasKey(q => q.questionPreferencesId);


            // Static tables
            modelBuilder.Entity<QuestionKinds>().ToTable("questionKinds", "app_sys")
                .HasKey(u => u.questionKindID);
            modelBuilder.Entity<Tables>().ToTable("tables", "app_sys")
                .HasKey(u => u.tableID);
            modelBuilder.Entity<TimezoneLocationView>().ToView("v_timezoneLocation", "app_sys")
                .HasKey(u => u.timezoneLocationID);


            // Checklist data
            modelBuilder.Entity<Morning>().ToTable("morning", "checklist")
                .HasKey(u => u.id);
            modelBuilder.Entity<Night>().ToTable("night", "checklist")
                .HasKey(u => u.id);
            modelBuilder.Entity<Daily>().ToTable("daily", "checklist")
                .HasKey(u => u.id);
            modelBuilder.Entity<Wellbeing>().ToTable("wellbeing", "checklist")
                .HasKey(u => u.id);
            modelBuilder.Entity<Physical>().ToTable("physical", "checklist")
                .HasKey(u => u.id);
            // modelBuilder.Entity<Sleep>().ToTable("sleep", "app")
            //     .HasKey(u => u.SleepID);

            modelBuilder.Entity<SpendingFinancial>().ToTable("spendingFinancial", "checklist")
                .HasKey(u => u.id);
            modelBuilder.Entity<SpendingHealthcare>().ToTable("spendingHealthcare", "checklist")
                .HasKey(u => u.id);
            modelBuilder.Entity<SpendingPersonal>().ToTable("spendingPersonal", "checklist")
                .HasKey(u => u.id);
            modelBuilder.Entity<SpendingRegular>().ToTable("spendingRegular", "checklist")
                .HasKey(u => u.id);
        }

        protected override void ConfigureConventions(ModelConfigurationBuilder builder) {
            base.ConfigureConventions(builder);
            builder.Properties<DateOnly>().HaveConversion<DateTimeToOnlyConverter>();
        }


    }
}

