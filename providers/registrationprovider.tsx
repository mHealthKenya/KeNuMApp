import { View, Text } from 'react-native';
import React, {
	FC,
	ReactNode,
	createContext,
	useContext,
	useState,
} from 'react';
import { RegistrationApplication } from '../models/regapplications';

interface Registration {
	registration: RegistrationApplication | null;
	handleRegistration: (item: RegistrationApplication) => void;
}

const RegistrationContext = createContext<Registration>({
	registration: null,
	handleRegistration: (_item: RegistrationApplication) => {},
});

export const useRegistrationFetched = () => useContext(RegistrationContext);

const RegistrationProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [registration, setRegistration] =
		useState<RegistrationApplication | null>(null);

	const handleRegistration = (registration: RegistrationApplication) => {
		setRegistration(registration);
	};

	return (
		<RegistrationContext.Provider
			value={{
				registration,
				handleRegistration,
			}}>
			{children}
		</RegistrationContext.Provider>
	);
};

export default RegistrationProvider;
