using Microsoft.EntityFrameworkCore;

namespace server.Models;

public class PessoaModel
{
    public string Nome { get; set; }
    public string Rua { get; set; }
    public string Numero { get; set; }
    public string Complemento { get; set; }
    public string RG { get; set; }
    public int CidadeId { get; set; }
    public int TipoId { get; set; }

    
}