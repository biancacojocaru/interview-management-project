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
    public class CandidatesController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public CandidatesController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public List<Candidates> GetCandidates()
        {
            using (IDbConnection connection = new SqlConnection(_configuration["ConnectionStrings:DefaultConnection"]))
            {
                string query = $@"
                    SELECT c.*, v.*,d.*
                    FROM Candidates c
                    JOIN Vacancies v ON v.VacanciesId = c.VacanciesId
                    JOIN Department d ON d.DepartmentId = c.DepartmentId";
                return connection.Query<Candidates>(query).ToList();
            }
        }


        [HttpGet("{id}")]
        public ActionResult<Candidates> GetCandidateById(int id)
        {
            using (IDbConnection connection = new SqlConnection(_configuration["ConnectionStrings:DefaultConnection"]))
            {
                string query = $@"
                   SELECT c.*, v.*,d.*
                    FROM Candidates c
                    JOIN Vacancies v ON v.VacanciesId = c.VacanciesId
                    JOIN Department d ON d.DepartmentId = c.DepartmentId
                    WHERE c.CandidateId = {id}";
                var candidate = connection.QueryFirstOrDefault<Candidates>(query);

                if (candidate == null)
                {
                    return NotFound();
                }

                return candidate;
            }
        }


        [HttpPost]
        public void InsertCandidate([FromBody] Candidates candidate)
        {
            using (IDbConnection connection = new SqlConnection(_configuration["ConnectionStrings:DefaultConnection"]))
            {
                string query = $@"
                    INSERT INTO Candidates 
                    (
                        NameCandidate, 
                        Email, 
                        PhoneNumber, 
                        CV, 
                        Documents, 
                        VacanciesId
                        DepartmentId
                    )
                    VALUES 
                    (
                        '{candidate.NameCandidate}', 
                        '{candidate.Email}', 
                        '{candidate.PhoneNumber}', 
                        '{candidate.CV}', 
                        '{candidate.Documents}', 
                        '{candidate.VacanciesId}',
                        '{candidate.DepartmentId}',
                    )";
                connection.Execute(query);
            }
        }

        [HttpPut]
        public void UpdateCandidate([FromBody] Candidates candidate)
        {
            using (IDbConnection connection = new SqlConnection(_configuration["ConnectionStrings:DefaultConnection"]))
            {
                string query = $@"
                    UPDATE Candidates
                    SET 
                        NameCandidate = '{candidate.NameCandidate}', 
                        Email = '{candidate.Email}', 
                        PhoneNumber = '{candidate.PhoneNumber}', 
                        CV = '{candidate.CV}', 
                        Documents = '{candidate.Documents}', 
                        VacanciesId = {candidate.VacanciesId}
                        DepartmentId = {candidate.DepartmentId}
                    WHERE 
                        CandidateId = {candidate.CandidateId}";
                connection.Execute(query);
            }
        }

        [HttpDelete("{id}")]
        public void DeleteCandidate(int id)
        {
            using (IDbConnection connection = new SqlConnection(_configuration["ConnectionStrings:DefaultConnection"]))
            {
                string query = $@"
                    DELETE FROM Candidates
                    WHERE CandidateId = {id}";
                connection.Execute(query);
            }
        }
    }
}
