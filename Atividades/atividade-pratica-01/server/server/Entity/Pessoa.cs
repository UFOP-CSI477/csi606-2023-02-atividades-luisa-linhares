using Microsoft.EntityFrameworkCore;

namespace server.Models;

public class Pessoa : Entity
{
    public int Id { get; set; }
    public string Nome { get; set; }
    public string Rua { get; set; }
    public string Numero { get; set; }
    public string Complemento { get; set; }
    public string RG { get; set; }
    public int CidadeId { get; set; }
    public Cidade Cidade { get; set; }
    public int TipoId { get; set; }
    public TipoSanguineo TipoSanguineo { get; set; }

    public static void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Pessoa>()
            .HasOne(p => p.Cidade)
            .WithMany()
            .HasForeignKey(p => p.CidadeId);

        modelBuilder.Entity<Pessoa>()
            .HasOne(p => p.TipoSanguineo)
            .WithMany()
            .HasForeignKey(p => p.TipoId);
    }
}