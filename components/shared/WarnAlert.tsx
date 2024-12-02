import React, {FC} from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {View} from 'react-native';
import {Text} from '../Themed';

const WarningAlert: FC<{message: string}> = ({message}) => {
	return (
		<View className='bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 mx-2 mt-2 rounded-r-lg shadow-md'>
			<View className='flex py-4 items-center justify-between'>
				<View className='flex flex-row gap-4 items-center'>
					<FontAwesome name='warning' size={34} color='#fbbf24' />
					<Text className='text-yellow-700'>{message}</Text>
				</View>
			</View>
		</View>
	);
};

export default WarningAlert;
