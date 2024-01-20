using Microsoft.EntityFrameworkCore;

namespace server.Models;

public class LocalColetaModel
{
    public string Nome { get; set; }
    public string Rua { get; set; }
    public string Numero { get; set; }
    public string Complemento { get; set; }
    public int CidadeId { get; set; }
}