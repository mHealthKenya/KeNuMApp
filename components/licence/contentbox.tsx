import React, {FC} from 'react';
import {Pressable, View} from 'react-native';
import {Icon} from 'react-native-paper';
import globalStyles from '../../styles/global';
import {Text} from '../Themed';

export interface ContentBoxProps {
	title: string;
	id: string;
}

const ContentBox: FC<{
	box: ContentBoxProps;
	action: (item: ContentBoxProps) => void;
}> = ({box, action}) => {
	return (
		<Pressable className='bg-[#FFFFFF] p-3 mx-2 my-1 rounded-xl' onPress={() => action(box)}>
			<View style={[globalStyles.row, {justifyContent: 'space-between', alignItems: 'center'}]}>
				<View className='flex flex-col'>
					<View className='p-2'>
						<Text className='text-lg'>{box.title}</Text>
					</View>
				</View>
				<View className='flex items-center justify-center'>
					<Icon size={30} source='chevron-right' />
				</View>
			</View>
		</Pressable>
	);
};

export default ContentBox;
