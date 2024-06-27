using API.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using Dapper;
using System.Data.SqlClient;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly IConfiguration _config;
        public DepartmentController(IConfiguration config)
        {
            _config = config;
        }

        // GET: api/<DepartmentController>
        [HttpGet]
        public List<Department> GetDepartment()
        {
            using (IDbConnection connection = new SqlConnection(_config["ConnectionStrings:DefaultConnection"]))
            {
                string query = $@"
                    SELECT * 
                    FROM Department";

                return connection.Query<Department>(query).ToList();
            }
        }
        // GET: api/<DepartmentController>/5
        [HttpGet("{id}")]
        public ActionResult<Department> GetDepartmentById(int id)
        {
            using (IDbConnection connection = new SqlConnection(_config["ConnectionStrings:DefaultConnection"]))
            {
                string query = $@"
                    SELECT * 
                    FROM Department
                    WHERE DepartmentId = {id}";

                var department = connection.QueryFirstOrDefault<Department>(query);

                if (department == null)
                {
                    return NotFound();
                }

                return department;
            }
        }


        // POST: api/<DepartmentController>
        [HttpPost]
        public void CreateDepartment([FromBody] Department department)
        {
            using (IDbConnection connection = new SqlConnection(_config["ConnectionStrings:DefaultConnection"]))
            {
                string query = $@"
                    INSERT INTO Department 
                    (
                        NameDepartment
                    )
                    VALUES 
                    (
                        '{department.NameDepartment}'
                    )";

                connection.Execute(query);
            }
        }


        // PUT: api/<DepartmentController>/5
        [HttpPut("{id}")]
        public IActionResult UpdateDepartment(int id, [FromBody] Department department)
        {
            if (id != department.DepartmentId)
            {
                return BadRequest();
            }

            using (IDbConnection connection = new SqlConnection(_config["ConnectionStrings:DefaultConnection"]))
            {
                string query = $@"
                    UPDATE Department
                    SET NameDepartment = '{department.NameDepartment}'
                    WHERE DepartmentId = {department.DepartmentId}";

                var affectedRows = connection.Execute(query, department);

                if (affectedRows == 0)
                {
                    return NotFound();
                }

                return NoContent();
            }
        }


        // DELETE: api/<DepartmentController>/5
        [HttpDelete("{id}")]
        public IActionResult DeleteDepartment(int id)
        {
            using (IDbConnection connection = new SqlConnection(_config["ConnectionStrings:DefaultConnection"]))
            {
                string query = $@"
                    DELETE FROM Department
                    WHERE DepartmentId = {id}";

                var affectedRows = connection.Execute(query);

                if (affectedRows == 0)
                {
                    return NotFound();
                }

                return NoContent();
            }
        }
    }
}
