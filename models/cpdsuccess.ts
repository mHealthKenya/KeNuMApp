export interface CPDSuccess {
	status: string;
	message: Message;
}

export interface Message {
	index_id: string;
	category_id: string;
	event_date: Date;
	event_title: string;
	event_location: string;
	cpd_evidence: string;
}
