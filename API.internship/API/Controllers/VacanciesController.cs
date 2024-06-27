using API.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using Dapper;
using System.Net.Http.Headers;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VacanciesController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public VacanciesController(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        // GET: api/<VacanciesController>
        [HttpGet]
        public List<Vacancies> GetVacancies()
        {
            using (IDbConnection connection = new SqlConnection(_configuration["ConnectionStrings:DefaultConnection"]))
            {
                string query = $@"
                    SELECT v.*, d.*
                    FROM Vacancies v
                    JOIN Department d ON d.DepartmentId = v.DepartmentId";

                 return connection.Query<Vacancies>(query).ToList();
            }
        }


        // GET api/<VacanciesController>/5
        [HttpGet("{id}")]
        public ActionResult<Vacancies> GetVacancyById(int id)
        {
            using (IDbConnection connection = new SqlConnection(_configuration["ConnectionStrings:DefaultConnection"]))
            {
                string query = $@"
                    SELECT v.*, d.* 
                    FROM Vacancies v
                    JOIN Department d ON d.DepartmentId = v.DepartmentId
                    WHERE v.VacanciesId = {id}";
                var vacancy = connection.QueryFirstOrDefault<Vacancies>(query);

                if (vacancy == null)
                {
                    return NotFound();
                }

                return vacancy;
            }
        }

        // POST api/<VacanciesController>
        [HttpPost]
        public void InsertVacancy(Vacancies vacancy)
        {
            using (IDbConnection connection = new SqlConnection(_configuration["ConnectionStrings:DefaultConnection"]))
            {
                string query = $@"
                    INSERT INTO Vacancies 
                    (
                        PositionName, 
                        DepartmentId, 
                        JobType,
                        StatusType, 
                        DeadLine, 
                        Location
                    )
                    VALUES 
                    (
                        '{vacancy.PositionName}', 
                        '{vacancy.DepartmentId}', 
                        '{vacancy.JobType}',
                        '{vacancy.StatusType}', 
                        '{vacancy.DeadLine}', 
                        '{vacancy.Location}'
                    )";
                connection.Execute(query);
            }
        }

        // PUT api/<VacanciesController>/5
        [HttpPut]
        public void UpdateVacancy(Vacancies vacancy)
        {
            using (IDbConnection connection = new SqlConnection(_configuration["ConnectionStrings:DefaultConnection"]))
            {
                string query = $@"
                    UPDATE Vacancies
                    SET 
                        PositionName = '{vacancy.PositionName}', 
                        DepartmentId = '{vacancy.DepartmentId}', 
                        JobType = '{vacancy.JobType}', 
                        StatusType = '{vacancy.StatusType}', 
                        DeadLine = '{vacancy.DeadLine}', 
                        Location = '{vacancy.Location}'
                    WHERE 
                        VacanciesId = {vacancy.VacanciesId}";
                connection.Execute(query);
            }
        }

        // DELETE api/<VacanciesController>/5
        [HttpDelete("{id}")]
        public void DeleteVacancy(int id)
        {
            using (IDbConnection connection = new SqlConnection(_configuration["ConnectionStrings:DefaultConnection"]))
            {
                string query = $@"
                    DELETE FROM Vacancies
                    WHERE VacanciesId = {id}";
                connection.Execute(query);
            }
        }
    }
}
