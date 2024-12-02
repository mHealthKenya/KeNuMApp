import React, {FC} from 'react';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import {View} from 'react-native';
import {Text} from '../Themed';

const InfoAlert: FC<{message: string}> = ({message}) => {
	return (
		<View className='bg-blue-50 border-l-4 border-blue-400 p-4 mb-4 mx-2 mt-2 rounded-r-lg shadow-md'>
			<View className='flex py-4 items-center justify-between'>
				<View className='flex flex-row gap-4 items-center'>
					<FontAwesome name='info' size={34} color='#60a5fa' />
					<Text>{message}</Text>
				</View>
			</View>
		</View>
	);
};

export default InfoAlert;
