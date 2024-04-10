using AutoMapper;
using WorkersList.Core.Entities;
using WorkersListServer.Models;


namespace WorkersListServer.Mapping
{
    public class ApiMappingProfile:Profile
    {
        public ApiMappingProfile()
        {
            CreateMap<WorkerPutModel, Worker>().ReverseMap();

            CreateMap<PositionPutModel, Position>().ReverseMap();
        }
    }
}
