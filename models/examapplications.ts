export interface ExamApplication {
	application_id: string;
	exams_series: string;
	cadre: string;
	application_date: Date;
	exam_centers: string;
	invoice_details: ExamInvoiceDetails;
}

export interface ExamInvoiceDetails {
	invoice_date: Date;
	invoice_desc: string;/  
	invoice_number: string;
	total_amount: string;
	amount_due: number;
	amount_paid: string;
	balance_due: string;
	convenience_fee: string;
	apiClientID: string;
	serviceID: string;
	notificationURL: string;
	callBackURLOnSuccess: string;
	pictureURL: string;
	billRefNumber: string;
	currency: string;
	amountExpected: string;
	billDesc: string;
	clientMSISDN: string;
	clientIDNumber: string;
	clientEmail: string;
	clientName: string;
	secureHash: string;
	pesaflow_url: string;
}
