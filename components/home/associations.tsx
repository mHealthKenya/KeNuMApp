import {Image, ImageSource} from 'expo-image';
import {Link} from 'expo-router';
import React, {FC} from 'react';
import {Pressable, View} from 'react-native';
import {Icon} from 'react-native-paper';
import {Text} from '../Themed';

interface Item {
	width: number;
	height: number;
}

interface Association extends Item {
	source: ImageSource;
	title: string;
	subtitle: string;
}

const AssociationItem: FC<{item: Association}> = ({item: {width, height, source, title, subtitle}}) => {
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
						<Text className='tracking-wide' bold>
							{title}
						</Text>
					</View>
					<View style={{flexDirection: 'row'}}>
						<Text
							className='text-base tracking-wide italic antialiased'
							numberOfLines={2}
							style={{flex: 1, flexWrap: 'wrap'}}>
							{subtitle}
						</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

const Associations: FC<{item: Item}> = ({item: {width, height}}) => {
	return (
		<View
			style={{
				height: 'auto',
				backgroundColor: '#e7e8ea',
			}}
			className='m-2 rounded-xl shadow-lg'>
			<View className='p-2 my-3'>
				<Text className='text-xl tracking-widest' bold>
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
				<Link asChild href='/kpna'>
					<Pressable>
						<AssociationItem
							item={{
								width,
								height,
								source: require('../../assets/images/kpna.png'),
								title: 'Kenya Progressive Nurses Association',
								subtitle: 'Harmony In Nursing the Professional Cure',
							}}
						/>
					</Pressable>
				</Link>

				<Link asChild href='/mak'>
					<Pressable>
						<AssociationItem
							item={{
								width,
								height,
								source: require('../../assets/images/mak.jpg'),
								title: 'Midwives Association of Kenya',
								subtitle: 'Revitalising the midwifery and its future profession in the country',
							}}
						/>
					</Pressable>
				</Link>

				<Link asChild href='/nnak'>
					<Pressable>
						<AssociationItem
							item={{
								width,
								height,
								source: require('../../assets/images/nnak.png'),
								title: 'National Nurses Association of Kenya',
								subtitle: 'Voice of the nursing profession',
							}}
						/>
					</Pressable>
				</Link>
			</View>
		</View>
	);
};

export default Associations;
