using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkersList.Core.Entities;

namespace WorkersList.Core.Repositories
{
    public interface IWorkerRepository
    {
        Task<IEnumerable<Worker>> GetAllAsync();

        Task<Worker> GetByIdAsync(int id);

        Task<Worker> AddAsync(Worker worker);

        Task<Worker> UpdateAsync(int id,Worker worker);

        Task DeleteAsync(int id);


    }
}
