import {Image, ImageSource} from 'expo-image';
import {Href, useRouter} from 'expo-router';
import React, {FC} from 'react';
import {Pressable, View} from 'react-native';
import {Divider, Icon} from 'react-native-paper';
import {Text} from '../Themed';

export interface InternBox {
	title: string;
	content: string;
	backgroundColor: string;
	path: ImageSource;
	route: Href;
	disabled?: boolean;
}

const BoxImage: FC<{data: InternBox}> = ({data}) => {
	const router = useRouter();

	if (data?.disabled) {
		return <></>;
	}

	return (
		<Pressable
			className={`flex flex-1 bg-[#FFFFFF] justify-center rounded-lg m-2 p-2`}
			onPress={() => router.push(data.route)}>
			<View className='flex flex-1 flex-row gap-2'>
				<Image
					source={data.path}
					style={{
						width: 80,
						height: 80,
					}}
					contentFit='contain'
				/>
				<View className='flex flex-1 flex-col gap-2 p-2 flex-wrap'>
					<View
						style={{
							paddingHorizontal: 10,
						}}>
						<Text className='text-xl' bold>
							{data.title}
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
						<Text className='text-lg'>{data.content}</Text>
					</View>
				</View>
				<View className='justify-center items-center'>
					<Icon size={30} source='chevron-right' />
				</View>
			</View>
		</Pressable>
	);
};

export default BoxImage;
