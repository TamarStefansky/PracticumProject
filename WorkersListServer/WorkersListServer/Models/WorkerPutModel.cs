using WorkersList.Core.Entities;

namespace WorkersListServer.Models
{
    public class WorkerPutModel
    {

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Password { get; set; }

        public string WorkerId { get; set; }

        public DateTime StartWorkDate { get; set; }

        public DateTime BirthDate { get; set; }

        public string Gender { get; set; }

        public List<PositionPutModel> Positions { get; set; }
    }
}
