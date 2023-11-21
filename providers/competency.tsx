import React, {
	FC,
	ReactNode,
	createContext,
	useContext,
	useState,
} from 'react';
import { RotationCompetency } from '../models/rotationcompetencies';

interface Competency {
	competency: RotationCompetency | null;
	handleCompetency: (competency: RotationCompetency) => void;
}

const CompetencyContext = createContext<Competency>({
	competency: null,
	handleCompetency: (_competency: RotationCompetency) => {},
});

export const useFetchedCompetency = () => useContext(CompetencyContext);

const CompetencyProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [competency, setCompetency] = useState<RotationCompetency | null>(null);

	const handleCompetency = (competency: RotationCompetency) => {
		setCompetency(competency);
	};

	return (
		<CompetencyContext.Provider
			value={{
				competency,
				handleCompetency,
			}}>
			{children}
		</CompetencyContext.Provider>
	);
};

export default CompetencyProvider;
