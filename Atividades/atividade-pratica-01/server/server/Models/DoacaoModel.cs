using Microsoft.EntityFrameworkCore;

namespace server.Models;

public class DoacaoModel
{
    public int PessoaId { get; set; }
    public int LocalId { get; set; }
    public DateTime Data { get; set; }
    
}