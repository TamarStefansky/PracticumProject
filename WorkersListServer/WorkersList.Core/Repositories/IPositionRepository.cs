using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkersList.Core.Entities;

namespace WorkersList.Core.Repositories
{
    public interface IPositionRepository
    {
       
        Task<IEnumerable<string>> GetPositionsNamesAsync();

    }
}
