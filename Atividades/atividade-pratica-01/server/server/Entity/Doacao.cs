using Microsoft.EntityFrameworkCore;

namespace server.Models;

public class Doacao : Entity
{
    public int Id { get; set; }
    public int PessoaId { get; set; }
    public Pessoa Pessoa { get; set; }
    public int LocalId { get; set; }
    public LocalColeta LocalColeta { get; set; }
    public DateTime Data { get; set; }

    public static void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Doacao>()
            .HasOne(d => d.Pessoa)
            .WithMany()
            .HasForeignKey(d => d.PessoaId);

        modelBuilder.Entity<Doacao>()
            .HasOne(d => d.LocalColeta)
            .WithMany()
            .HasForeignKey(d => d.LocalId);
    }
}