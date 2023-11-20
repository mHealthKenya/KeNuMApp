export interface CPDActivity {
	provider: string;
	activity_category: string;
	activity: string;
	activity_location: string;
	activity_date: Date;
	activity_evidence: null | string;
	points_earned: string;
	approval_status: string;
	approval_comments: string;
}
