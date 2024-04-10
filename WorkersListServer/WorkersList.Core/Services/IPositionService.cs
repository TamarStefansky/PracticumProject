using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkersList.Core.Entities;

namespace WorkersList.Core.Services
{
    public interface IPositionService
    {
      
        Task<IEnumerable<string>> GetPositionsNamesAsync();

    }
}
