export interface LicenceApplication {
	application_id: string;
	renewal_year: string;
	renewal_date: Date;
	workstation_id: string;
	workstation_name: string;
	employer_id: string;
	employer: string;
	county_id: string;
	County: string;
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


