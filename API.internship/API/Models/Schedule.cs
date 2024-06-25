namespace API.Models
{
    public class Schedule
    {
        public int EventId { get; set; }
        public string? Title { get; set; }
        public DateTime Date { get; set; }
        public string? Hour { get; set; }
        public string? Term { get; set; }
        public string? Location { get; set; }
        public string? NameEmployee { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public string? CV { get; set; }
        public string? Documents { get; set; }
        public Candidates? Candidates { get; set; }
        public string? Details { get; set; }
  
    }
}
