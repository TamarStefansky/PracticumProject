using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkersList.Core.Entities;

namespace WorkersList.Core.DTOs
{
    public class WorkerDto
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Password { get; set; }

        public string WorkerId { get; set; }

        public DateTime StartWorkDate { get; set; }

        public string Gender { get; set; }

        public bool IsActive { get; set; }

        public List<Position> Positions { get; set; }
    }
}
