using Microsoft.EntityFrameworkCore;

namespace reservaSala.Entity
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options): base(options) { }
        public DbSet<Reserva> Reservas { get; set; }
        public DbSet<Sala> Salas { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Reserva>().HasOne(r => r.Sala).WithMany().HasForeignKey(r => r.IdSala);
            modelBuilder.Entity<Reserva>().HasOne(r => r.Usuario).WithMany().HasForeignKey(r =>r.IdUsuario);
        }
    }
}
