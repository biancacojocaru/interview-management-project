export interface Vacancy {
    vacanciesId: number;
    positionName?: string;
    departmentId: number;
    nameDepartment?: string;
    jobType: number;
    statusType: number;
    deadLine: string;
    location: string;
  }
  
  export interface Department {
    departmentId: number;
    nameDepartment: string;
  }