export interface PracticeApplication {
    application_id: string;
    renewal_year: string;
    renewal_date: Date;
    proposed_practice: string;
    practice_mode: string;
    workstation_id: string;
    workstation_name: string;
    county_id: string;
    county: string;
    town: string;
    invoice_no: string;
    amount_due: string;
    amount_paid: string;
    balance_due: string;
}
