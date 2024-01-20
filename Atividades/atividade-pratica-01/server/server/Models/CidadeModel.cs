
using Microsoft.EntityFrameworkCore;

namespace server.Models;

public class CidadeModel
{
    public string Nome { get; set; }
    public int EstadoId { get; set; }
}