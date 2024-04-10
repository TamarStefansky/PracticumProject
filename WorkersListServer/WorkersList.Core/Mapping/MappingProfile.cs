using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkersList.Core.DTOs;
using WorkersList.Core.Entities;

namespace WorkersList.Core.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Worker, WorkerDto>().ReverseMap();
            CreateMap<Position, PositionDto>().ReverseMap();
        }
    }
}
