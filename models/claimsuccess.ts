export interface ClaimSuccess {
	status: string;
	message: Message;
}

export interface Message {
	index_id: string;
	event_token: string;
}
