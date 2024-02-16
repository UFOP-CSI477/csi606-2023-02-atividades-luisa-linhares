namespace reservaSala.Entity
{
    public class Reserva
    {
        public int Id { get; set;}
        public DateTime DataReserva { get; set; }
        public int IdSala { get; set; }
        public int IdUsuario { get; set; }
        public Sala Sala { get; set; }
        public Usuario Usuario { get; set;}

    }
}
