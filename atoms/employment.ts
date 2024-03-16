import { atom } from "jotai";

interface Employment {
    employment_status: string
    current_employer: string
    workstation_type: string
    county: string
    workstation_id: string
    department: string
    workstation_name: string
    current_position: string
    duration_current_employer: string
    experience_years: string
}

export const employmentAtom = atom<Employment | null>(null)