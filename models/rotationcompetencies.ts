export interface RotationCompetencies {
	rotation_competencies: RotationCompetency[];
}

export interface RotationCompetency {
	competency_id: string;
	competency: string;
	minimum_requirement: string;
}
