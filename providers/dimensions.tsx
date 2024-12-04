import React, {createContext, FC, ReactNode, useContext, useEffect, useState} from 'react';

import * as ScreenOrientation from 'expo-screen-orientation';
import {useWindowDimensions} from 'react-native';

export enum DeviceOrientation {
	PORTRAIT_UP = 1,
	PORTRAIT_DOWN = 2,
	LANDSCAPE_LEFT = 3,
	LANDSCAPE_RIGHT = 4,
}

interface Dimensions {
	width: number;
	height: number;
}

interface Props {
	portrait: boolean;
	dimensions: Dimensions;
}

const DimensionsContext = createContext<Props>({
	portrait: false,
	dimensions: {
		width: 0,
		height: 0,
	},
});

export const useDimensions = () => useContext(DimensionsContext);

const DimensionsProvider: FC<{children: ReactNode}> = ({children}) => {
	const [portrait, setPortrait] = useState(false);

	const {width, height} = useWindowDimensions();

	const [dimensions, setDimensions] = useState<Dimensions>({
		width,
		height,
	});

	useEffect(() => {
		const getOrientation = async () => {
			const current = await ScreenOrientation.getOrientationAsync();

			setPortrait(current < 3);
			return current;
		};

		getOrientation();

		const orientationChangedSub = ScreenOrientation.addOrientationChangeListener(orientationChanged);

		return () => {
			ScreenOrientation.removeOrientationChangeListener(orientationChangedSub);
		};
	}, []);

	useEffect(() => {
		setDimensions({height, width});
	}, [height, portrait, width]);

	const orientationChanged = (result: ScreenOrientation.OrientationChangeEvent) => {
		setPortrait(result.orientationInfo.orientation < 3);
	};

	return <DimensionsContext.Provider value={{portrait, dimensions}}>{children}</DimensionsContext.Provider>;
};

export default DimensionsProvider;
