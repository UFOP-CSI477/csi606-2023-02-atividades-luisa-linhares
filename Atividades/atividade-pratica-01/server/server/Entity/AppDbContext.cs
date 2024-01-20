using Microsoft.EntityFrameworkCore;

namespace server.Models;

public partial class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<TipoSanguineo> TiposSanguineos { get; set; }
    public DbSet<Estado> Estados { get; set; }
    public DbSet<Cidade> Cidades { get; set; }
    public DbSet<Pessoa> Pessoas { get; set; }
    public DbSet<LocalColeta> LocaisColeta { get; set; }
    public DbSet<Doacao> Doacoes { get; set; }

    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        OnModelCreatingPartial(modelBuilder);
        Cidade.OnModelCreating(modelBuilder);
        Pessoa.OnModelCreating(modelBuilder);
        LocalColeta.OnModelCreating(modelBuilder);
        Doacao.OnModelCreating(modelBuilder);
    }
    
    public override int SaveChanges()
    {
        SetTimestamps();
        return base.SaveChanges();
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
    {
        SetTimestamps();
        return base.SaveChangesAsync(cancellationToken);
    }

    private void SetTimestamps()
    {
        var entities = ChangeTracker.Entries().Where(x => x is { Entity: Entity, State: EntityState.Added or EntityState.Modified });
    
        var currentDateTime = DateTime.UtcNow;
    
        foreach (var entity in entities)
        {
            if (entity.State == EntityState.Added)
            {
                ((Entity)entity.Entity).CreatedAt = currentDateTime;
            }
        
            ((Entity)entity.Entity).UpdatedAt = currentDateTime;
        }
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

}