using System.Reflection;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using server.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());
builder.Services.AddCors(options => 
{
    options.AddPolicy("Open", builder =>
    {
        builder.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});
var connectionString = builder.Configuration.GetConnectionString("TipoSanguinio") ?? "Data Source=TipoSanguinio.db";

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSqlite<AppDbContext>(connectionString);
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/cidades", async (AppDbContext db) => await db.Cidades.Include(c => c.Estado).ToListAsync());
app.MapGet("/cidade/{id}", async (AppDbContext db, int id) =>
{
    var cidade = await db.Cidades.FindAsync(id);
    if (cidade == null)
    {
        return Results.NotFound();
    }
    return Results.Ok(cidade);
});

app.MapPost("/cidade", async (AppDbContext db, CidadeModel cidadeModel, IMapper mapper) =>
{
    var cidade = mapper.Map<Cidade>(cidadeModel);
    await db.Cidades.AddAsync(cidade);
    await db.SaveChangesAsync();
    return Results.Created($"/cidade/{cidade.Id}", cidade);
});

app.MapPut("/cidade/{id}", async (AppDbContext db, int id, CidadeModel cidadeInput, IMapper mapper) =>
{
    var cidadeEntity = await db.Cidades.FindAsync(id);
    if (cidadeEntity == null)
    {
        return Results.NotFound();
    }
    mapper.Map(cidadeInput, cidadeEntity);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapDelete("/cidade/{id}", async (AppDbContext db, int id) =>
{
    var cidade = await db.Cidades.FindAsync(id);
    if (cidade == null)
    {
        return Results.NotFound();
    }
    db.Cidades.Remove(cidade);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapGet("/estados", async (AppDbContext db) => await db.Estados.ToListAsync());

app.MapGet("/estado/{id}", async (AppDbContext db, int id) =>
{
    var estado = await db.Estados.FindAsync(id);
    if (estado == null)
    {
        return Results.NotFound();
    }
    return Results.Ok(estado);
});

app.MapPost("/estado", async (AppDbContext db, EstadoModel estadoModel, IMapper mapper) =>
{
    var estado = mapper.Map<Estado>(estadoModel);
    await db.Estados.AddAsync(estado);
    await db.SaveChangesAsync();
    return Results.Created($"/cidade/{estado.Id}", estado);
});

app.MapPut("/estado/{id}", async (AppDbContext db, int id, EstadoModel inputEstado, IMapper mapper) =>
{
    var estadoEntity = await db.Estados.FindAsync(id);
    if (estadoEntity == null)
    {
        return Results.NotFound();
    }
    mapper.Map(inputEstado, estadoEntity);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapDelete("/estado/{id}", async (AppDbContext db, int id) =>
{
    var estado = await db.Estados.FindAsync(id);
    if (estado == null)
    {
        return Results.NotFound();
    }
    db.Estados.Remove(estado);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapGet("/tiposanguineo", async (AppDbContext db) => await db.TiposSanguineos.ToListAsync());

app.MapGet("/tiposanguineo/{id}", async (AppDbContext db, int id) =>
{
    var tipoSanguineo = await db.TiposSanguineos.FindAsync(id);
    if (tipoSanguineo == null)
    {
        return Results.NotFound();
    }
    return Results.Ok(tipoSanguineo);
});

app.MapPost("/tiposanguineo", async (AppDbContext db, TipoSanguineoModel tipoSanguineoModel, IMapper mapper) =>
{
    var tipoSanguineo = mapper.Map<TipoSanguineo>(tipoSanguineoModel);
    await db.TiposSanguineos.AddAsync(tipoSanguineo);
    await db.SaveChangesAsync();
    return Results.Created($"/tiposanguineo/{tipoSanguineo.Id}", tipoSanguineo);
});

app.MapPut("/tiposanguineo/{id}", async (AppDbContext db, int id, TipoSanguineoModel tipoSanguineoInput, IMapper mapper) =>
{
    var tipoSanguineoEntity = await db.TiposSanguineos.FindAsync(id);
    if (tipoSanguineoEntity == null)
    {
        return Results.NotFound();
    }
    mapper.Map(tipoSanguineoInput, tipoSanguineoEntity);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapDelete("/tiposanguineo/{id}", async (AppDbContext db, int id) =>
{
    var tipoSanguineo = await db.TiposSanguineos.FindAsync(id);
    if (tipoSanguineo == null)
    {
        return Results.NotFound();
    }
    db.TiposSanguineos.Remove(tipoSanguineo);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapGet("/pessoas", async (AppDbContext db) => await db.Pessoas.Include(p => p.Cidade).Include(p => p.TipoSanguineo).ToListAsync());
app.MapGet("/pessoa/{id}", async (AppDbContext db, int id) =>
{
    var pessoa = await db.Pessoas.FindAsync(id);
    if (pessoa == null)
    {
        return Results.NotFound();
    }
    return Results.Ok(pessoa);
});

app.MapPost("/pessoa", async (AppDbContext db, PessoaModel pessoaModel, IMapper mapper) =>
{
    var pessoa = mapper.Map<Pessoa>(pessoaModel);
    await db.Pessoas.AddAsync(pessoa);
    await db.SaveChangesAsync();
    return Results.Created($"/pessoa/{pessoa.Id}", pessoa);
});

app.MapPut("/pessoa/{id}", async (AppDbContext db, int id, PessoaModel pessoaInput, IMapper mapper) =>
{
    var pessoaEntity = await db.Pessoas.FindAsync(id);
    if (pessoaEntity == null)
    {
        return Results.NotFound();
    }
    mapper.Map(pessoaInput, pessoaEntity);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapDelete("/pessoa/{id}", async (AppDbContext db, int id) =>
{
    var pessoa = await db.Pessoas.FindAsync(id);
    if (pessoa == null)
    {
        return Results.NotFound();
    }
    db.Pessoas.Remove(pessoa);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapGet("/locais", async (AppDbContext db) => await db.LocaisColeta.Include(lc => lc.Cidade).ToListAsync());
app.MapGet("/local/{id}", async (AppDbContext db, int id) =>
{
    var local = await db.LocaisColeta.FindAsync(id);
    if (local == null)
    {
        return Results.NotFound();
    }
    return Results.Ok(local);
});

app.MapPost("/local", async (AppDbContext db, LocalColetaModel localModel, IMapper mapper) =>
{
    var local = mapper.Map<LocalColeta>(localModel);
    await db.LocaisColeta.AddAsync(local);
    await db.SaveChangesAsync();
    return Results.Created($"/local/{local.Id}", local);
});

app.MapPut("/local/{id}", async (AppDbContext db, int id, LocalColetaModel localInput, IMapper mapper) =>
{
    var localEntity = await db.LocaisColeta.FindAsync(id);
    if (localEntity == null)
    {
        return Results.NotFound();
    }
    mapper.Map(localInput, localEntity);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapDelete("/local/{id}", async (AppDbContext db, int id) =>
{
    var local = await db.LocaisColeta.FindAsync(id);
    if (local == null)
    {
        return Results.NotFound();
    }
    db.LocaisColeta.Remove(local);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapGet("/doacoes", async (AppDbContext db) => await db.Doacoes.Include(d => d.Pessoa).Include(d => d.LocalColeta).ToListAsync());
app.MapGet("/doacao/{id}", async (AppDbContext db, int id) =>
{
    var doacao = await db.Doacoes.FindAsync(id);
    if (doacao == null)
    {
        return Results.NotFound();
    }
    return Results.Ok(doacao);
});

app.MapPost("/doacao", async (AppDbContext db, DoacaoModel doacaoModel, IMapper mapper) =>
{
    var doacao = mapper.Map<Doacao>(doacaoModel);
    await db.Doacoes.AddAsync(doacao);
    await db.SaveChangesAsync();
    return Results.Created($"/doacao/{doacao.Id}", doacao);
});

app.MapPut("/doacao/{id}", async (AppDbContext db, int id, DoacaoModel doacaoInput, IMapper mapper) =>
{
    var doacaoEntity = await db.Doacoes.FindAsync(id);
    if (doacaoEntity == null)
    {
        return Results.NotFound();
    }
    mapper.Map(doacaoInput, doacaoEntity);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapDelete("/doacao/{id}", async (AppDbContext db, int id) =>
{
    var doacao = await db.Doacoes.FindAsync(id);
    if (doacao == null)
    {
        return Results.NotFound();
    }
    db.Doacoes.Remove(doacao);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.Run();