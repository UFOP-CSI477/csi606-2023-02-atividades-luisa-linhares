using AutoMapper;
using reservaSala.Entity;
using reservaSala.Models;

namespace reservaSala;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Sala, SalaModel>().ReverseMap();
        CreateMap<Usuario, UsuarioModel>().ReverseMap();
        CreateMap<Reserva, ReservaModel>().ReverseMap();
        CreateMap<Usuario, UsuarioModelResponse>().ReverseMap();

    }
}