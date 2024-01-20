using server.Models;

namespace server;

using AutoMapper;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Cidade, CidadeModel>().ReverseMap();
        CreateMap<Estado, EstadoModel>().ReverseMap();
        CreateMap<Doacao, DoacaoModel>().ReverseMap();
        CreateMap<LocalColeta, LocalColetaModel>().ReverseMap();
        CreateMap<Pessoa, PessoaModel>().ReverseMap();
        CreateMap<TipoSanguineo, TipoSanguineoModel>().ReverseMap();
    }
}