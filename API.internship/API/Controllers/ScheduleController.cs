using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using Dapper;

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
        public List<Schedule> GetSchedule()
        {
            using (IDbConnection connection = new SqlConnection(_configuration["ConnectionStrings:DefaultConnection"]))
            {
                string query = $@"
                    SELECT e.*,c.*
                    FROM Events e
                    JOIN Candidates c ON c.CandidateId = e.CandidateId";
                return connection.Query<Schedule>(query).ToList();
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
    };
}   
