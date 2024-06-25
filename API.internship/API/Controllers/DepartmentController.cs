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
        private readonly IConfiguration _configuration;

        public DepartmentController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // Temporary in-memory data store
        private static List<Department> departments = new List<Department>
        {
            new Department { DepartmentId = 1, NameDepartment = "HR" },
            new Department { DepartmentId = 2, NameDepartment = "IT" }
        };


        // GET: api/Department
        [HttpGet]
        public ActionResult<IEnumerable<Department>> GetDepartments()
        {
            return Ok(departments);
        }

        // GET: api/Department/5
        [HttpGet("{id}")]
        public ActionResult<Department> GetDepartment(int id)
        {
            var department = departments.FirstOrDefault(d => d.DepartmentId == id);
            if (department == null)
            {
                return NotFound();
            }
            return Ok(department);
        }

        // POST: api/Department
        [HttpPost]
        public ActionResult<Department> PostDepartment(Department department)
        {
            department.DepartmentId = departments.Max(d => d.DepartmentId) + 1;
            departments.Add(department);
            return CreatedAtAction(nameof(GetDepartment), new { id = department.DepartmentId }, department);
        }

        // PUT: api/Department/5
        [HttpPut("{id}")]
        public IActionResult PutDepartment(int id, Department department)
        {
            var existingDepartment = departments.FirstOrDefault(d => d.DepartmentId == id);
            if (existingDepartment == null)
            {
                return NotFound();
            }

            existingDepartment.NameDepartment = department.NameDepartment;
            return NoContent();
        }


        /// DELETE: api/Department/5
        [HttpDelete("{id}")]
        public IActionResult DeleteDepartment(int id)
        {
            var department = departments.FirstOrDefault(d => d.DepartmentId == id);
            if (department == null)
            {
                return NotFound();
            }

            departments.Remove(department);
            return NoContent();
        }
    }
}
