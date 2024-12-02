import React from 'react';
import {View} from 'react-native';

interface ProgressBarProps {
	progress: number; // 0 to 100
	color?: string;
	height?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({progress, color = 'bg-blue-500', height = 8}) => {
	const clampedProgress = Math.min(Math.max(progress, 0), 100);

	return (
		<View className={`w-full bg-gray-200 rounded-full overflow-hidden`} style={{height}}>
			<View
				className={`${color} rounded-full`}
				style={{
					width: `${clampedProgress}%`,
					height: '100%',
				}}
			/>
		</View>
	);
};

export default ProgressBar;
