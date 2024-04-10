using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkersList.Core.Entities
{
    public enum PositionsNames
    {
        CEO,
        Managerment,
        DeputyDirector,
        TeamLeader,
        MintenanceWorker,
        Secretary,
        ChiefSecretary,
        Programmer,
        SoftwareTester,
        ComputerEngineer,
        ComputerTechnician,
        Cleaner
    }
    public class Position
    {

        public int Id { get; set; }

        public string PositionName { get; set; }

        public bool IsAdministrative { get; set; }

        public DateTime StartPositionDate { get; set; }

    }
}
