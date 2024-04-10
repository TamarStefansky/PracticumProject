using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkersList.Core.Entities;
using WorkersList.Core.Repositories;
using WorkersList.Core.Services;

namespace WorkersList.Service
{
    public class PositionService:IPositionService
    {
        private readonly IPositionRepository _positionRepository;

        public PositionService(IPositionRepository positionRepository)
        {
            _positionRepository = positionRepository;
        }

                           public async Task<IEnumerable<string>> GetPositionsNamesAsync()
        {
            return await _positionRepository.GetPositionsNamesAsync();
        }

        

    }
}
