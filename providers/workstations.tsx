import React, {
	FC,
	ReactNode,
	createContext,
	useContext,
	useState,
} from 'react';

interface Item {
	title: string;
	id: string;
}

interface Work {
	county: Item | null;
	workStation: Item | null;
	handleCounty: (county: Item) => void;
	handleWorkStation: (station: Item) => void;
}

const WorkStationContext = createContext<Work>({
	county: null,
	workStation: null,
	handleCounty: (_county: Item) => {},
	handleWorkStation: (_station: Item) => {},
});

export const useWorkStationFetched = () => useContext(WorkStationContext);

const WorkStationProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [county, setCounty] = useState<Item | null>(null);
	const [workStation, setWorkStation] = useState<Item | null>(null);

	const handleCounty = (item: Item) => {
		setCounty(item);
	};

	const handleWorkStation = (item: Item) => {
		setWorkStation(item);
	};

	return (
		<WorkStationContext.Provider
			value={{
				county,
				workStation,
				handleCounty,
				handleWorkStation,
			}}>
			{children}
		</WorkStationContext.Provider>
	);
};

export default WorkStationProvider;
