using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkersList.Core.Entities;
using WorkersList.Core.Repositories;
using WorkersList.Data;

namespace WorkersList.Data.Reposirories
{
    public class WorkerRepository: IWorkerRepository
    {
        private readonly DataContext _dataContext;

        public WorkerRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        //public async Task<IEnumerable<Worker>> GetAllAsync()
        //{
        //    return await _dataContext.Workers.ToListAsync(); ;
        //}

        //public async Task<Worker> GetByIdAsync(string id)
        //{
        //   return await _dataContext.Workers.FirstAsync(w => w.WorkerId == id);
        //}

        public async Task<IEnumerable<Worker>> GetAllAsync()
        {
            return await _dataContext.Workers.Include(w => w.Positions).ToListAsync(); 

        }

        public async Task<Worker> GetByIdAsync(int id)
        {
          //  return await Task.FromResult(_dataContext.Workers.First(w => w.Id == id));

            var worker = await _dataContext.Workers.Include(w => w.Positions).FirstOrDefaultAsync(x => x.Id == id);

            if (worker == null)
            {
                throw new EntryPointNotFoundException($"Worker with ID {id} not found");
            }

            return worker;
        }

        public async Task<Worker> AddAsync(Worker worker)
        {
            _dataContext.Workers.Add(worker);
            await _dataContext.SaveChangesAsync();
            return worker;
        }

        public async Task<Worker> UpdateAsync(int id, Worker worker)
        {
            var updateWorker = await GetByIdAsync(id);
            worker.Id = id;
            //if (updateWorker != null)
            //{
                _dataContext.Entry(updateWorker).CurrentValues.SetValues(worker);
                //_dataContext.Entry(updateWorker).Collection(w => w.Positions).CurrentValue = worker.Positions;
            //}
            //else
            //{
            //    throw new EntryPointNotFoundException($"Worker with ID {id} not found");
            //}
            await _dataContext.SaveChangesAsync();
            return updateWorker;
        }

        public async Task DeleteAsync(int id)
        {
            Worker temp = await _dataContext.Workers.FindAsync(id);
            if (temp == null)
                return;
            temp.IsActive = false;
            await _dataContext.SaveChangesAsync();
        }
    }
}



