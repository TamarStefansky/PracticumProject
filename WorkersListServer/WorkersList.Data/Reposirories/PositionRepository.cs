using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkersList.Core.Entities;
using WorkersList.Core.Repositories;



namespace WorkersList.Data.Reposirories
{
    public class PositionRepository: IPositionRepository
    {
        private readonly DataContext _dataContext;

        public PositionRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<IEnumerable<string>> GetPositionsNamesAsync()
        {
            var positionsNames =  Enum.GetNames(typeof(PositionsNames)).ToList();
            return await Task.FromResult(positionsNames);
        }

    }
}
