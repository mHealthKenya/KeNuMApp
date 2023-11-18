import { View, Text } from 'react-native';
import React, {
	FC,
	ReactNode,
	createContext,
	useContext,
	useState,
} from 'react';
import { RotationCompetencies } from '../models/rotationcompetencies';

interface Competency {
	competencies: RotationCompetencies | null;
	handleCompetencies: (competencies: RotationCompetencies) => void;
}

const CompetenciesContext = createContext<Competency>({
	competencies: null,
	handleCompetencies: (_competencies: RotationCompetencies) => {},
});

export const useFetchedCompetencies = () => useContext(CompetenciesContext);

const RotationCompetenciesProvider: FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [competencies, setCompetencies] = useState<RotationCompetencies | null>(
		null
	);

	const handleCompetencies = (competencies: RotationCompetencies) => {
		setCompetencies(competencies);
	};

	return (
		<CompetenciesContext.Provider
			value={{
				competencies,
				handleCompetencies,
			}}>
			{children}
		</CompetenciesContext.Provider>
	);
};

export default RotationCompetenciesProvider;
