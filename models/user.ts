export interface User {
	id?: string;
	IndexNo?: string;
	Name?: string;
	IdNumber?: string;
	PassportNumber?: string;
	BirthCertNo?: string;
	DateOfBirth?: Date;
	Gender?: string;
	Address?: string;
	Email?: string;
	MobileNo?: string;
	ProfilePic?: string;
	education?: Education[];
	registration?: Registration[];
	license?: License[];
	cpd?: Cpd[];
}

export interface Cpd {
	cpd_requirement?: string;
	current_points?: string;
}

export interface Education {
	education_id?: string;
	cadre?: string;
	cadre_text?: string;
	institution?: string;
	admission_date?: Date;
	eligible_for_internship?: string;
	eligible_for_registration?: string;
}

export interface License {
	license_no?: string;
	from_date?: Date;
	to_date?: Date;
	workStation?: null | string;
}

export interface Registration {
	reg_no?: string;
	cadre?: string;
	cadre_text?: string;
}
