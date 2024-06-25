﻿namespace API.Models
{
    public class Candidates
    {
        public int CandidateId { get; set; }
        public string? NameCandidate { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? CV { get; set; }
        public string? Document { get; set; }
        public int VacanciesId { get; set; }
        public Vacancies? Vacancies { get; set; }
        public int DepartmentId { get; set; }
        public Department? Department { get; set; } 
    }
}