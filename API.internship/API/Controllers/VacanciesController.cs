using API.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VacanciesController : ControllerBase
    {
        // Temporary in-memory data store
        private static List<Vacancies> vacancies = new List<Vacancies>
        {
            new Vacancies { VacanciesId = 1, DepartmentId = 1, JobType = 1, StatusType = 1, DeadLine = DateTime.Now.AddDays(30), Location = "Location1" },
            new Vacancies { VacanciesId = 2, DepartmentId = 2, JobType = 2, StatusType = 2, DeadLine = DateTime.Now.AddDays(60), Location = "Location2" }
        };

        // GET: api/Vacancies
        [HttpGet]
        public ActionResult<IEnumerable<Vacancies>> GetVacancies()
        {
            return Ok(vacancies);
        }

        // GET: api/Vacancies/5
        [HttpGet("{id}")]
        public ActionResult<Vacancies> GetVacancy(int id)
        {
            var vacancy = vacancies.FirstOrDefault(v => v.VacanciesId == id);
            if (vacancy == null)
            {
                return NotFound();
            }
            return Ok(vacancy);
        }

        // POST: api/Vacancies
        [HttpPost]
        public ActionResult<Vacancies> PostVacancy(Vacancies vacancy)
        {
            vacancy.VacanciesId = vacancies.Max(v => v.VacanciesId) + 1;
            vacancies.Add(vacancy);
            return CreatedAtAction(nameof(GetVacancy), new { id = vacancy.VacanciesId }, vacancy);
        }

        // PUT: api/Vacancies/5
        [HttpPut("{id}")]
        public IActionResult PutVacancy(int id, Vacancies vacancy)
        {
            var existingVacancy = vacancies.FirstOrDefault(v => v.VacanciesId == id);
            if (existingVacancy == null)
            {
                return NotFound();
            }

            existingVacancy.DepartmentId = vacancy.DepartmentId;
            existingVacancy.JobType = vacancy.JobType;
            existingVacancy.StatusType = vacancy.StatusType;
            existingVacancy.DeadLine = vacancy.DeadLine;
            existingVacancy.Location = vacancy.Location;

            return NoContent();
        }

        // DELETE: api/Vacancies/5
        [HttpDelete("{id}")]
        public IActionResult DeleteVacancy(int id)
        {
            var vacancy = vacancies.FirstOrDefault(v => v.VacanciesId == id);
            if (vacancy == null)
            {
                return NotFound();
            }

            vacancies.Remove(vacancy);
            return NoContent();
        }
    }
}
