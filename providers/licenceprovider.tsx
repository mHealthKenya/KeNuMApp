import React, {
	FC,
	ReactNode,
	createContext,
	useContext,
	useState,
} from 'react';
import { LicenceApplication } from '../models/licenceapplications';

interface Licence {
	licence: LicenceApplication | null;
	handleLicence: (item: LicenceApplication) => void;
}

const LicenceContext = createContext<Licence>({
	licence: null,
	handleLicence: (_item: LicenceApplication) => {},
});

export const useLicenceFetched = () => useContext(LicenceContext);

const LicenceProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [licence, setLicence] = useState<LicenceApplication | null>(null);

	const handleLicence = (licence: LicenceApplication) => {
		setLicence(licence);
	};

	return (
		<LicenceContext.Provider
			value={{
				licence,
				handleLicence,
			}}>
			{children}
		</LicenceContext.Provider>
	);
};

export default LicenceProvider;
