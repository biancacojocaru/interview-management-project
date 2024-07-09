using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using Dapper;
using Microsoft.Extensions.Logging;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScheduleController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public ScheduleController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // GET: api/Schedule
        [HttpGet]
        public Dictionary<string, List<Schedule>> GetSchedule()
        {
            using (IDbConnection connection = new SqlConnection(_configuration["ConnectionStrings:DefaultConnection"]))
            {
                string query = $@"
                    SELECT e.*,c.*
                    FROM Events e
                    JOIN Candidates c ON c.CandidateId = e.CandidateId
                     ORDER BY e.Date";
                //return connection.Query<Schedule>(query).ToList();

                var events = connection.Query<Schedule>(query).ToList();

                var groupedEvents = events
                    .GroupBy(e => e.Date.Date)
                    .ToDictionary(
                        g => g.Key.ToString("yyyy-MM-dd"),
                        g => g.ToList()
                    );

                return groupedEvents;
            }
        }

        //GET: api/Schedule/5
        [HttpGet("{id}")]
        public ActionResult<Schedule> GetScheduleById(int id)
        {
            using (IDbConnection connection = new SqlConnection(_configuration["ConnectionStrings:DefaultConnection"]))
            {
                string query = $@"
                    SELECT e.*,c.*
                    FROM Events e
                    JOIN Candidates c ON c.CandidateId = e.CandidateId
                    WHERE e.EventId = {id}";
                var schedule = connection.QueryFirstOrDefault<Schedule>(query);

                if (schedule == null)
                {
                    return NotFound();
                }

                return schedule;
            }
        }

        [HttpPost]
        public ActionResult<int> InsertSchedule([FromBody] Schedule schedule)
        {
            using (IDbConnection connection = new SqlConnection(_configuration["ConnectionStrings:DefaultConnection"]))
            {
                string query = $@"
                    INSERT INTO Events 
                    (
                        Title,
                        Date, 
                        Hour,
                        Location, 
                        NameEmployee, 
                        Details, 
                        CandidateId
                    )
                    VALUES 
                    (
                        '{schedule.Title}', 
                        '{schedule.Date}', 
                        '{schedule.Hour}', 
                        '{schedule.Location}', 
                        '{schedule.NameEmployee}',
                        '{schedule.Details}',
                        '{schedule.CandidateId}'
                    );";

                return connection.Execute(query);
            }
        }

        [HttpPut]
        public void UpdateEvent([FromBody] Schedule schedule)
        {
            using (IDbConnection connection = new SqlConnection(_configuration["ConnectionStrings:DefaultConnection"]))
            {
                string query = $@"
                    UPDATE Events
                    SET 
                        Title = '{schedule.Title}', 
                        Date = '{schedule.Date}', 
                        Hour = '{schedule.Hour}', 
                        Location = '{schedule.Location}', 
                        NameEmployee = '{schedule.NameEmployee}', 
                        Details = '{schedule.Details}',
                        CandidateId = '{schedule.CandidateId}'
                    WHERE 
                        EventId = '{schedule.EventId}'";
                connection.Execute(query);
            }
        }

        [HttpDelete("{id}")]
        public void DeleteEvent(int id)
        {
            using (IDbConnection connection = new SqlConnection(_configuration["ConnectionStrings:DefaultConnection"]))
            {
                string query = $@"
                    DELETE FROM Events
                    WHERE EventId = {id}";
                connection.Execute(query);
            }
        }

    };
}   
