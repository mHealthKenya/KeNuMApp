export interface WorkStation {
	id: string;
	workstation: string;
}


export interface WorkStationTypes {
	workstation_types: WorkstationType[];
}

export interface WorkstationType {
	id: string;
	type: string;
}
