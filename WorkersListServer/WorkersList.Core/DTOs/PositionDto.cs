using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkersList.Core.Entities;

namespace WorkersList.Core.DTOs
{
    public class PositionDto
    {
        public string PositionName { get; set; }

        public bool IsAdministrative { get; set; }

        public DateTime StartPositionDate { get; set; }


    }
}
