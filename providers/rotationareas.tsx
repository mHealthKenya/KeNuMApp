import React, {
	FC,
	ReactNode,
	createContext,
	useContext,
	useState,
} from 'react';
import { RotationAreas } from '../models/rotationareas';

interface Rotation {
	areas: RotationAreas | null;
	setRotationAreas: (areas: RotationAreas) => void;
}

const RotationsAreaContext = createContext<Rotation>({
	areas: null,
	setRotationAreas: (_areas: RotationAreas) => {},
});

export const useFetchedRotationAreas = () => useContext(RotationsAreaContext);

const RotationAreasProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [areas, setAreas] = useState<RotationAreas | null>(null);

	const setRotationAreas = (areas: RotationAreas) => {
		setAreas(areas);
	};

	return (
		<RotationsAreaContext.Provider
			value={{
				areas,
				setRotationAreas,
			}}>
			{children}
		</RotationsAreaContext.Provider>
	);
};

export default RotationAreasProvider;
