import React, {
	FC,
	ReactNode,
	createContext,
	useContext,
	useState,
} from 'react';
import { OutmigrationApplicationHistory } from '../models/outmigrationapplicationhistory';

interface OutMigrate {
	migrate: OutmigrationApplicationHistory | null;
	handleMigrate: (item: OutmigrationApplicationHistory) => void;
}

const OutMigrateContext = createContext<OutMigrate>({
	migrate: null,
	handleMigrate: (_item: OutmigrationApplicationHistory) => {},
});

export const useOutMigrationFetched = () => useContext(OutMigrateContext);

const OutMigrationProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [migrate, setMigrate] = useState<OutmigrationApplicationHistory | null>(null);

	const handleMigrate = (item: OutmigrationApplicationHistory) => {
		setMigrate(item);
	};

	return (
		<OutMigrateContext.Provider
			value={{
				migrate,
				handleMigrate,
			}}>
			{children}
		</OutMigrateContext.Provider>
	);
};

export default OutMigrationProvider;
