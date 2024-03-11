using API.Data.Helpers;
using API.Models.Tables.Entities;
using API.Models.Views.Entities;
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
        public DbSet<ChecklistTypePreferences> ChecklistTypePreferences { get; set; }
        public DbSet<GeneralPreferences> GeneralPreferences { get; set; }
        // public DbSet<HiddenQuestions> HiddenQuestions { get; set; }

        public DbSet<QuestionPreferencesView> QuestionPreferencesView { get; set; }
        public DbSet<ChecklistTypePreferencesView> ChecklistTypePreferencesView { get; set; }


        // Static tables/views
        public DbSet<QuestionKindView> QuestionKindsView { get; set; }
        public DbSet<ChecklistTypeView> ChecklistTypesView { get; set; }
        public DbSet<TimezoneLocationView> TimezoneLocationsView { get; set; }
        
        // Checklist data
        public DbSet<Morning> Morning { get; set; }
        public DbSet<Night> Night { get; set; }
        public DbSet<Daily> Daily { get; set; }
        public DbSet<Wellbeing> Wellbeing { get; set; }
        public DbSet<Physical> Physical { get; set; }
        // public DbSet<Sleep> Sleep { get; set; }

        // Spending
        public DbSet<SpendingFinancial> SpendingFinancial { get; set; }
        public DbSet<SpendingHealthcare> SpendingHealthcare { get; set; }
        public DbSet<SpendingPersonal> SpendingPersonal { get; set; }
        public DbSet<SpendingRegular> SpendingRegular { get; set; }

        // Writing
        public DbSet<Dream> Dream { get; set; }
        public DbSet<Journal> Journal { get; set; }
        public DbSet<Gratitude> Gratitude { get; set; }



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
            modelBuilder.Entity<ChecklistTypePreferences>().ToTable("checklistTypePreferences", "app")
                .HasKey(u => u.checklistTypePreferencesID);
            modelBuilder.Entity<GeneralPreferences>().ToTable("generalPreferences", "app")
                .HasKey(u => u.generalPreferencesID);
            // modelBuilder.Entity<HiddenQuestions>().ToTable("hiddenQuestions", "app")
            //     .HasKey(u => u.hiddenQuestionID);

            // Metadata views related to user
            modelBuilder.Entity<QuestionPreferencesView>().ToView("v_questionPreferences", "app")
                .HasKey(q => q.questionPreferencesID);
            modelBuilder.Entity<ChecklistTypePreferencesView>().ToView("v_checklistTypePreferences", "app")
                .HasKey(t => t.checklistTypePreferencesID);

            // Static views
            modelBuilder.Entity<QuestionKindView>().ToView("v_questionKind", "app_sys")
                .HasKey(u => u.questionKindID);
            modelBuilder.Entity<ChecklistTypeView>().ToView("v_checklistType", "app_sys")
                .HasKey(u => u.checklistTypeID);
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

            modelBuilder.Entity<Dream>().ToTable("dream", "checklist")
                .HasKey(u => u.id);
            modelBuilder.Entity<Journal>().ToTable("journal", "checklist")
                .HasKey(u => u.id);
            modelBuilder.Entity<Gratitude>().ToTable("gratitude", "checklist")
                .HasKey(u => u.id);
        }

        protected override void ConfigureConventions(ModelConfigurationBuilder builder) {
            base.ConfigureConventions(builder);
            builder.Properties<DateOnly>().HaveConversion<DateTimeToOnlyConverter>();
        }


    }
}

