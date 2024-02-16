using System.Reflection;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using reservaSala.Entity;
using reservaSala.Models;

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
var connectionString = "Data Source=ReservaSala.db";
// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSqlite<AppDbContext>(connectionString);
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseCors("Open");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/salas",async(AppDbContext db) => 
{
    return await db.Salas.ToListAsync();
});
app.MapPost("/sala", async (AppDbContext db, SalaModel salaModel, IMapper mapper) =>
{
    var sala = mapper.Map <Sala>(salaModel);
    await db.Salas.AddAsync(sala);
    await db.SaveChangesAsync();
    return Results.Created($"/sala/{sala.Id}", sala);
});

app.MapPut("/sala/{id}", async (AppDbContext db, SalaModel salaModel, IMapper mapper, int id) =>
{
    var sala = await db.Salas.FindAsync(id);
    if (sala == null)
    {
        return Results.NotFound();
    }

    mapper.Map(salaModel, sala);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapDelete("/sala/{id}", async (AppDbContext db, IMapper mapper, int id) =>
{
    var sala = await db.Salas.FindAsync(id);
    if (sala == null)
    {
        return Results.NotFound();
    }

    db.Salas.Remove(sala);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapGet("/reservas", async (AppDbContext db, int? salaId = null, int? userId = null) => 
{
    IQueryable<Reserva> query = db.Reservas.Include(r => r.Sala).Include(r => r.Usuario);
    
    if (salaId.HasValue)
    {
        query = query.Where(r => r.Sala.Id == salaId);
    }
    if (userId.HasValue)
    {
        query = query.Where(r => r.Usuario.Id == userId);
    }
    
    return await query.ToListAsync();
});
app.MapPost("/reservas", async (AppDbContext db, ReservaModel reservaModel, IMapper mapper) =>
{
    var reserva = mapper.Map <Reserva>(reservaModel);
    await db.Reservas.AddAsync(reserva);
    await db.SaveChangesAsync();
    return Results.Created($"/reserva/{reserva.Id}", reserva);
});

app.MapPut("/reserva/{id}", async (AppDbContext db, ReservaModel reservaModel, IMapper mapper, int id) =>
{
    var reserva = await db.Reservas.FindAsync(id);
    if (reserva == null)
    {
        return Results.NotFound();
    }

    mapper.Map(reservaModel, reserva);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapDelete("/reserva/{id}", async (AppDbContext db, IMapper mapper, int id) =>
{
    var reserva = await db.Reservas.FindAsync(id);
    if (reserva == null)
    {
        return Results.NotFound();
    }

    db.Reservas.Remove(reserva);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapGet("/usuarios",async(AppDbContext db) => 
{
    return await db.Usuarios.ToListAsync();
});
app.MapPost("/usuarios", async (AppDbContext db, UsuarioModel usuarioModel, IMapper mapper) =>
{
    var usuario = mapper.Map <Usuario>(usuarioModel);
    await db.Usuarios.AddAsync(usuario);
    await db.SaveChangesAsync();
    return Results.Created($"/usuario/{usuario.Id}", usuario);
});

app.MapPut("/usuario/{id}", async (AppDbContext db, UsuarioModel usuarioModel, IMapper mapper, int id) =>
{
    var usuario = await db.Usuarios.FindAsync(id);
    if (usuario == null)
    {
        return Results.NotFound();
    }

    mapper.Map(usuarioModel, usuario);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapDelete("/usuario/{id}", async (AppDbContext db, IMapper mapper, int id) =>
{
    var usuario = await db.Usuarios.FindAsync(id);
    if (usuario == null)
    {
        return Results.NotFound();
    }

    db.Usuarios.Remove(usuario);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapPost("/login", async (AppDbContext db, LoginModel loginModel, IMapper mapper) =>
{
    var usuario = await db.Usuarios.FirstOrDefaultAsync(u => u.Email == loginModel.Email && u.Senha == loginModel.Senha);
    if (usuario == null)
    {
        return Results.Unauthorized();
    }

    return Results.Ok(mapper.Map<UsuarioModelResponse>(usuario));
});



app.Run();

