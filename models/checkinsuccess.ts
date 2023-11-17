export interface CheckinApp {
	status: string;
	message: Message;
}

export interface Message {
	internship_id: string;
	checkin_date: Date;
	nurse_officer_incharge: string;
	nurse_officer_incharge_mobile: string;
	supervisor: string;
	supervisor_mobile: string;
	nurse_officer_incharge_email: string;
	supervisor_email: string;
}
