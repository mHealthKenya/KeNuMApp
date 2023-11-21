import React, {
	FC,
	ReactNode,
	createContext,
	useContext,
	useState,
} from 'react';
import { InternshipApplication } from '../models/internshipapplications';

interface Internship {
	application: InternshipApplication | null;
	handleApplication: (application: InternshipApplication) => void;
}

const InternshipContext = createContext<Internship>({
	application: null,
	handleApplication: (_application: InternshipApplication) => {},
});

export const useInternshipFetched = () => useContext(InternshipContext);

const InternshipProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [application, setApplication] = useState<InternshipApplication | null>(
		null
	);

	const handleApplication = (application: InternshipApplication) => {
		setApplication(application);
	};

	return (
		<InternshipContext.Provider
			value={{
				application,
				handleApplication,
			}}>
			{children}
		</InternshipContext.Provider>
	);
};

export default InternshipProvider;
