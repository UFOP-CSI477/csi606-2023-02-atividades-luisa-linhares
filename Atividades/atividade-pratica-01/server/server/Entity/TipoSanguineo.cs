namespace server.Models;

public class TipoSanguineo : Entity
{
    public int Id { get; set; }
    public string Tipo { get; set; }
    public string Fator { get; set; }
}