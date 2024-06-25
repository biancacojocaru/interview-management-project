using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandidatesController : ControllerBase
    {
        private static List<Candidates> candidates = new List<Candidates>
        {
            new Candidates { CandidateId = 1, NameCandidate = "John Doe", Email = "john.doe@example.com", PhoneNumber = "1234567890", CV = "cv.pdf", Document = "doc.pdf", VacanciesId = 1, DepartmentId = 1 },
            new Candidates { CandidateId = 2, NameCandidate = "Jane Smith", Email = "jane.smith@example.com", PhoneNumber = "0987654321", CV = "cv2.pdf", Document = "doc2.pdf", VacanciesId = 2, DepartmentId = 2 }
        };

        // GET: api/Candidates
        [HttpGet]
        public ActionResult<IEnumerable<Candidates>> GetCandidates()
        {
            return Ok(candidates);
        }

        // GET: api/Candidates/5
        [HttpGet("{id}")]
        public ActionResult<Candidates> GetCandidate(int id)
        {
            var candidate = candidates.FirstOrDefault(c => c.CandidateId == id);
            if (candidate == null)
            {
                return NotFound();
            }
            return Ok(candidate);
        }

        // POST: api/Candidates
        [HttpPost]
        public ActionResult<Candidates> PostCandidate(Candidates candidate)
        {
            candidate.CandidateId = candidates.Max(c => c.CandidateId) + 1;
            candidates.Add(candidate);
            return CreatedAtAction(nameof(GetCandidate), new { id = candidate.CandidateId }, candidate);
        }

        // PUT: api/Candidates/5
        [HttpPut("{id}")]
        public IActionResult PutCandidate(int id, Candidates candidate)
        {
            var existingCandidate = candidates.FirstOrDefault(c => c.CandidateId == id);
            if (existingCandidate == null)
            {
                return NotFound();
            }

            existingCandidate.NameCandidate = candidate.NameCandidate;
            existingCandidate.Email = candidate.Email;
            existingCandidate.PhoneNumber = candidate.PhoneNumber;
            existingCandidate.CV = candidate.CV;
            existingCandidate.Document = candidate.Document;
            existingCandidate.VacanciesId = candidate.VacanciesId;
            existingCandidate.DepartmentId = candidate.DepartmentId;

            return NoContent();
        }

        // DELETE: api/Candidates/5
        [HttpDelete("{id}")]
        public IActionResult DeleteCandidate(int id)
        {
            var candidate = candidates.FirstOrDefault(c => c.CandidateId == id);
            if (candidate == null)
            {
                return NotFound();
            }

            candidates.Remove(candidate);
            return NoContent();
        }
    }
}
