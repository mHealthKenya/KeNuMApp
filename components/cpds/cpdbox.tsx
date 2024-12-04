import {Image, ImageSource} from 'expo-image';
import {Href, useRouter} from 'expo-router';
import React, {FC} from 'react';
import {Pressable, View} from 'react-native';
import {Divider, Icon} from 'react-native-paper';
import {Text} from '../Themed';

export interface CPDBox {
	title: string;
	content: string;
	backgroundColor: string;
	path: ImageSource;
	route: Href<string>;
}

const CPDBoxComponent: FC<{box: CPDBox}> = ({box}) => {
	const router = useRouter();
	return (
		<Pressable className='flex m-2 p-2 rounded-lg bg-white' onPress={() => router.push(box.route)}>
			<View className='flex flex-row gap-2'>
				<Image
					source={box.path}
					style={{
						width: 80,
						height: 80,
						borderRadius: 40,
					}}
					contentFit='contain'
				/>
				<View className='flex flex-1 flex-col gap-2'>
					<View className='p-2'>
						<Text className='text-xl' bold>
							{box.title}
						</Text>
						<Divider
							style={{
								marginTop: 5,
							}}
						/>
					</View>
					<View className='p-2'>
						<Text className='text-lg text-[#74787e]'>{box.content}</Text>
					</View>
				</View>
				<View className='flex justify-center items-center'>
					<Icon size={30} source='chevron-right' />
				</View>
			</View>
		</Pressable>
	);
};

export default CPDBoxComponent;
