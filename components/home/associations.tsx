import { Image, ImageSource } from 'expo-image';
import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-paper';

interface Item {
	width: number;
	height: number;
}

interface Association extends Item {
	source: ImageSource;
	title: string;
	subtitle: string;
}

const AssociationItem: FC<{ item: Association }> = ({
	item: { width, height, source, title, subtitle },
}) => {
	return (
		<View className='flex flex-col p-2 my-2 bg-slate-50 rounded-xl'>
			<View
				className='p-2 flex flex-row'
				style={{
					height: 'auto',
					width: 'auto',
				}}>
				<View className='mr-4'>
					<Image
						source={source}
						style={{
							width: width * 0.1,
							height: height * 0.05,
							borderRadius: (height * 0.05) / 2,
						}}
					/>
				</View>

				<View className='flex flex-col justify-center'>
					<View>
						<Text className='text-sm tracking-wide font-bold'>{title}</Text>
					</View>
					<View style={{ flexDirection: 'row' }}>
						<Text
							className='text-xs tracking-wide italic antialiased'
							numberOfLines={2}
							style={{ flex: 1, flexWrap: 'wrap' }}>
							{subtitle}
						</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

const Associations: FC<{ item: Item }> = ({ item: { width, height } }) => {
	return (
		<View
			style={{
				height: 'auto',
				backgroundColor: '#e7e8ea',
			}}
			className='m-2 rounded-xl shadow-lg'>
			<View className='p-2 my-3'>
				<Text className='font-bold text-xl tracking-widest'>
					Professional Associations
				</Text>
			</View>
			<View className='p-2 flex flex-row gap-2'>
				<View>
					<Icon source='information-outline' size={20} color='#07457e' />
				</View>

				<View>
					<Text
						className='text-sm tracking-wide italic'
						style={{
							color: '#07457e',
						}}>
						Click on an association for more information
					</Text>
				</View>
			</View>

			<View className='flex flex-col justify-between p-2'>
				<AssociationItem
					item={{
						width,
						height,
						source: require('../../assets/images/kpna.png'),
						title: 'Kenya Progressive Nurses Association',
						subtitle: 'Harmony In Nursing the Professional Cure',
					}}
				/>

				<AssociationItem
					item={{
						width,
						height,
						source: require('../../assets/images/mak.jpg'),
						title: 'Midwives Association of Kenya',
						subtitle:
							'Revitalising the midwifery and its future profession in the country',
					}}
				/>

				<AssociationItem
					item={{
						width,
						height,
						source: require('../../assets/images/nnak.png'),
						title: 'National Nurses Association of Kenya',
						subtitle: 'Voice for the nursing profession',
					}}
				/>
			</View>
		</View>
	);
};

export default Associations;


