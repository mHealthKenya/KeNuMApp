import {Image, ImageSource} from 'expo-image';
import {Href, useRouter} from 'expo-router';
import React, {FC} from 'react';
import {Pressable, View} from 'react-native';
import {Divider, Icon} from 'react-native-paper';
import {Text} from '../Themed';

export interface LicenceBox {
	title: string;
	content: string;
	backgroundColor: string;
	path: ImageSource;
	route: Href;
	action?: () => void;
	danger?: boolean;
}

const LBox: FC<{box: LicenceBox}> = ({box}) => {
	const router = useRouter();

	const handlePress = () => {
		if (box.action) {
			box.action();
		}
		router.push(box.route);
	};

	return (
		<Pressable
			className={`flex flex-1 flex-row m-2 rounded-xl`}
			onPress={() => handlePress()}
			style={{
				backgroundColor: box.backgroundColor,
			}}>
			<View className='flex flex-1 flex-row gap-2'>
				<View className='flex justify-center items-center p-2'>
					<Image
						source={box.path}
						style={{
							width: 80,
							height: 80,
							borderRadius: 40,
						}}
						contentFit='contain'
					/>
				</View>

				<View className='flex flex-1'>
					<View className='p-2'>
						<Text
							style={[
								{
									color: box.danger ? '#FFF' : '#000000',
								},
							]}
							className='text-xl'
							bold>
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
						<Text
							style={[
								{
									color: box.danger ? '#FFF' : '#74787e',
								},
							]}
							className='text-lg'>
							{box.content}
						</Text>
					</View>
				</View>
				<View className='flex justify-center items-center'>
					<Icon size={30} source='chevron-right' color={box.danger ? '#FFF' : '#000'} />
				</View>
			</View>
		</Pressable>
	);
};

export default LBox;
