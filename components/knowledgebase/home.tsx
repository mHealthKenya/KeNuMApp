import {Href, useRouter} from 'expo-router';
import React, {FC} from 'react';
import {Pressable, View, useWindowDimensions} from 'react-native';
import {Divider, Icon} from 'react-native-paper';
import globalStyles from '../../styles/global';
import {Text} from '../Themed';

export interface KnowBox {
	title: string;
	content: string;
	url: Href;
}

const HomeBox: FC<{routing: KnowBox}> = ({routing}) => {
	const {width, height} = useWindowDimensions();
	const actualWidth = Math.min(width, height);
	const usableWidth = actualWidth - 20;

	const router = useRouter();

	const handlePress = (item: Href) => {
		router.push(item);
	};

	return (
		<Pressable className='flex m-2 py-4 justify-center bg-[#FFFFFF] rounded-lg' onPress={() => handlePress(routing.url)}>
			<View style={[globalStyles.row, {justifyContent: 'space-between', alignItems: 'center'}]}>
				<View
					style={[
						globalStyles.column,
						{
							width: usableWidth * 0.8,
						},
					]}>
					<View
						style={{
							paddingHorizontal: 10,
						}}>
						<Text className='text-xl'>{routing.title}</Text>
						<Divider
							style={{
								marginTop: 5,
							}}
						/>
					</View>
					<View
						style={{
							padding: 10,
						}}>
						<Text>{routing.content}</Text>
					</View>
				</View>
				<Icon size={30} source='chevron-right' />
			</View>
		</Pressable>
	);
};

export default HomeBox;
