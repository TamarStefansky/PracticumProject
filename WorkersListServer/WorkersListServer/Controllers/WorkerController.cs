using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WorkersList.Core.DTOs;
using WorkersList.Core.Entities;
using WorkersList.Core.Services;
using WorkersListServer.Controllers;
using WorkersListServer.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WorkersListServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkerController : ControllerBase
    {
        private readonly IWorkerService _workerService;

        private readonly IMapper _mapper;

        public WorkerController(IWorkerService workerService, IMapper mapper)
        {
            _workerService = workerService;
            _mapper = mapper;
        }


        // GET: api/<WorkerController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {

            return Ok(await _workerService.GetAllAsync());
        }

        // GET api/<WorkerController>/5
        [HttpGet("{id}")]

        public async Task<ActionResult> Get(int id)
        {
            return Ok(await _workerService.GetByIdAsync(id));
        }

        // POST api/<WorkerController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] WorkerPutModel worker)
        {

            var workerToAdd = _mapper.Map<Worker>(worker);
            return Ok(await _workerService.AddAsync(workerToAdd));
        }

        // PUT api/<WorkerController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] WorkerPutModel workerPutModel)
        {
            
            var w = await _workerService.GetByIdAsync(id);
            if (w is null)
            {
                return NotFound();
            }
            _mapper.Map(workerPutModel, w);
            return Ok(_mapper.Map<WorkerDto>(await _workerService.
                UpdateAsync(id,_mapper.Map<Worker>(w))));
        }

        // DELETE api/<WorkerController>/5
        [HttpDelete("{id}")]

        public async Task<ActionResult> Delete(int id)
        {
            var position = await _workerService.GetByIdAsync(id);
            if (position is null)
            {
                return NotFound();
            }
            await _workerService.DeleteAsync(id);
            return NoContent();
        }
    }
}






