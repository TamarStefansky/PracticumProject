using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;
using WorkersList.Core.DTOs;
using WorkersList.Core.Entities;
using WorkersList.Core.Services;
using WorkersListServer.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WorkersListServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PositionController : ControllerBase
    {

        private readonly IPositionService _positionService;


        public PositionController(IPositionService positionService)
        {
            _positionService = positionService;
            
        }


      

        [HttpGet("GetPositionsNames")]
        public async Task<ActionResult> GetPositionsNames()
        {

            return Ok(await _positionService.GetPositionsNamesAsync());
        }

        
    }
}
