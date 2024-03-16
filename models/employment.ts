export interface EmploymentStatus {
    employment_status: EmploymentStatusElement[];
}

export interface EmploymentStatusElement {
    id: string;
    status: string;
}


export interface EmploymentPeriods {
    employment_periods: EmploymentPeriod[];
}

export interface EmploymentPeriod {
    id: string;
    period: string;
}
