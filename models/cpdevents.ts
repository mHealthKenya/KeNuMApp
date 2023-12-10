export interface CPDEvent {
	id: string;
	index_id: string;
	event_title: string;
	event_description: string;
	event_year: string;
	event_start_date: Date;
	event_end_date: Date;
	program: string;
	activity: string;
	category: string;
	provider: string;
	delivery_mode: string;
	event_token: string;
	attended_event: string;
	token_redeemed: string;
}
