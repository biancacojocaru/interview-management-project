namespace API.Models
{
    public class Schedule
    {
        public int EventId { get; set; }
        public string? Title { get; set; }
        public DateTime Date { get; set; }
        public string? Hour { get; set; }
        public string? Location { get; set; }
        public string? NameEmployee { get; set; }
        public string? Details { get; set; }
        public int CandidateId { get; set; }
    }
}
