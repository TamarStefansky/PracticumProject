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
    public class WorkerService:IWorkerService
    {
        private readonly IWorkerRepository _workerRepository;

        public WorkerService(IWorkerRepository workerRepository)
        {
            _workerRepository = workerRepository;
        }

        public async Task<Worker> AddAsync(Worker worker)
        {
            return await _workerRepository.AddAsync(worker);
        }

        public async Task DeleteAsync(int id)
        {
            await _workerRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<Worker>> GetAllAsync()
        {
            return await _workerRepository.GetAllAsync();
        }

        public async Task<Worker> GetByIdAsync(int id)
        {
            return await _workerRepository.GetByIdAsync(id);
        }

        public async Task<Worker> UpdateAsync(int id, Worker worker)
        {
            return await _workerRepository.UpdateAsync(id,worker);
        }
    }
}
