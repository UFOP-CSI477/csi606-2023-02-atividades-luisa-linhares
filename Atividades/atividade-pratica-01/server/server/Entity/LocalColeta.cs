using Microsoft.EntityFrameworkCore;

namespace server.Models;

public class LocalColeta : Entity
{
    public int Id { get; set; }
    public string Nome { get; set; }
    public string Rua { get; set; }
    public string Numero { get; set; }
    public string Complemento { get; set; }
    public int CidadeId { get; set; }
    public Cidade Cidade { get; set; }

    public static void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<LocalColeta>()
            .HasOne(lc => lc.Cidade)
            .WithMany()
            .HasForeignKey(lc => lc.CidadeId);
    }
}