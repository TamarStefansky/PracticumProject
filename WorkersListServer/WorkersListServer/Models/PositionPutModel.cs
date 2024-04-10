using WorkersList.Core.Entities;

namespace WorkersListServer.Models
{
    public class PositionPutModel
    {
        public string PositionName { get; set; }

        public bool IsAdministrative { get; set; }

        public DateTime StartPositionDate { get; set; }

    }
}
