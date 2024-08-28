export interface RegistrationApplication {
	application_id: string;
	education_id: string;
	registration_no: null;
	registration_date: null;
	cadre: string;
	cadre_desc: string;
	application_date: Date;
	current_photo: string;
	application_status: string;
	invoice_details: InvoiceDetails;
}


export interface InvoiceDetails {
	invoice_date: Date;
	invoice_desc: string;
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

