using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScheduleController : ControllerBase
    {
        private static List<Schedule> schedules = new List<Schedule>
        {
            new Schedule
            {
                EventId = 1,
                Title = "Meeting with John",
                Date = DateTime.Now.AddDays(1),
                Hour = "10:00 AM",
                Term = "Q1",
                Location = "Room 101",
                NameEmployee = "John Doe",
                PhoneNumber = "1234567890",
                Email = "john.doe@example.com",
                CV = "cv.pdf",
                Documents = "doc.pdf",
                Details = "Discuss project status"
            },
            new Schedule
            {
                EventId = 2,
                Title = "Interview with Jane",
                Date = DateTime.Now.AddDays(2),
                Hour = "2:00 PM",
                Term = "Q1",
                Location = "Room 202",
                NameEmployee = "Jane Smith",
                PhoneNumber = "0987654321",
                Email = "jane.smith@example.com",
                CV = "cv2.pdf",
                Documents = "doc2.pdf",
                Details = "Initial interview"
            }
        };

        // GET: api/Schedule
        [HttpGet]
        public ActionResult<IEnumerable<Schedule>> GetSchedules()
        {
            return Ok(schedules);
        }

        // GET: api/Schedule/5
        [HttpGet("{id}")]
        public ActionResult<Schedule> GetSchedule(int id)
        {
            var schedule = schedules.FirstOrDefault(s => s.EventId == id);
            if (schedule == null)
            {
                return NotFound();
            }
            return Ok(schedule);
        }

        // POST: api/Schedule
        [HttpPost]
        public ActionResult<Schedule> PostSchedule(Schedule schedule)
        {
            schedule.EventId = schedules.Max(s => s.EventId) + 1;
            schedules.Add(schedule);
            return CreatedAtAction(nameof(GetSchedule), new { id = schedule.EventId }, schedule);
        }

        // PUT: api/Schedule/5
        [HttpPut("{id}")]
        public IActionResult PutSchedule(int id, Schedule schedule)
        {
            var existingSchedule = schedules.FirstOrDefault(s => s.EventId == id);
            if (existingSchedule == null)
            {
                return NotFound();
            }

            existingSchedule.Title = schedule.Title;
            existingSchedule.Date = schedule.Date;
            existingSchedule.Hour = schedule.Hour;
            existingSchedule.Term = schedule.Term;
            existingSchedule.Location = schedule.Location;
            existingSchedule.NameEmployee = schedule.NameEmployee;
            existingSchedule.PhoneNumber = schedule.PhoneNumber;
            existingSchedule.Email = schedule.Email;
            existingSchedule.CV = schedule.CV;
            existingSchedule.Documents = schedule.Documents;
            existingSchedule.Candidates = schedule.Candidates;
            existingSchedule.Details = schedule.Details;

            return NoContent();
        }

        // DELETE: api/Schedule/5
        [HttpDelete("{id}")]
        public IActionResult DeleteSchedule(int id)
        {
            var schedule = schedules.FirstOrDefault(s => s.EventId == id);
            if (schedule == null)
            {
                return NotFound();
            }

            schedules.Remove(schedule);
            return NoContent();
        }
    }
}
