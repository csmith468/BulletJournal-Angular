using System.Data;
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

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            if (!optionsBuilder.IsConfigured) {
                optionsBuilder
                    .UseSqlServer(_config.GetConnectionString("DefaultConnection"),
                        optionsBuilder => optionsBuilder.EnableRetryOnFailure());
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.HasDefaultSchema("bja");

            modelBuilder.Entity<AppUser>()
                .ToTable("appUser", "bja")
                .HasKey(u => u.Email);
        }

    }
}

