import {Image, ImageSource} from 'expo-image';
import {Href, useRouter} from 'expo-router';
import React, {FC} from 'react';
import {Pressable, View, useWindowDimensions} from 'react-native';
import {Divider, Icon} from 'react-native-paper';
import globalStyles from '../../styles/global';
import {Text} from '../Themed';

export interface CPDBox {
	title: string;
	content: string;
	backgroundColor: string;
	path: ImageSource;
	route: Href<string>;
}

const CPDBoxComponent: FC<{box: CPDBox}> = ({box}) => {
	const {width, height} = useWindowDimensions();
	const actualWidth = Math.min(width, height);
	const usableWidth = actualWidth - 20;
	const router = useRouter();
	return (
		<Pressable className='flex m-2 p-2 rounded-lg bg-white' onPress={() => router.push(box.route)}>
			<View style={[globalStyles.row, {justifyContent: 'space-between', alignItems: 'center'}]}>
				<Image
					source={box.path}
					style={{
						width: 60,
						height: 80,
						borderRadius: 40,
					}}
				/>
				<View
					style={[
						globalStyles.column,
						{
							width: usableWidth * 0.6,
						},
					]}>
					<View
						style={{
							paddingHorizontal: 10,
						}}>
						<Text className='text-xl' bold>
							{box.title}
						</Text>
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
						<Text className='text-lg text-[#74787e]'>{box.content}</Text>
					</View>
				</View>
				<Icon size={30} source='chevron-right' />
			</View>
		</Pressable>
	);
};

export default CPDBoxComponent;
