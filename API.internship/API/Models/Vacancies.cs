namespace API.Models
{
    public class Vacancies
    {
        public int VacanciesId { get; set; }
        public string? PositionName { get; set; }
        public int DepartmentId { get; set; }
        public string? NameDepartment { get; set; }
        public int JobType { get; set; }
        public int StatusType { get; set; }
        public DateTime DeadLine { get; set; }
        public string? Location { get; set; }
    }
}
