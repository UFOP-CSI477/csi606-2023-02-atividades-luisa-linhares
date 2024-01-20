using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

public class Cidade : Entity
{
    public int Id { get; set; }
    public string Nome { get; set; }
    public int EstadoId { get; set; }
    public Estado Estado { get; set; }
    
    public static void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Cidade>()
            .HasOne(c => c.Estado)
            .WithMany()
            .HasForeignKey(c => c.EstadoId);
    }
}