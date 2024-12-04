import {Image, ImageSource} from 'expo-image';
import {Link} from 'expo-router';
import React, {FC} from 'react';
import {Pressable, View} from 'react-native';
import {Icon} from 'react-native-paper';
import {Text} from '../Themed';

interface Association {
	source: ImageSource;
	title: string;
	subtitle: string;
}

const AssociationItem: FC<{item: Association}> = ({item: {source, title, subtitle}}) => {
	return (
		<View className='flex flex-1 flex-col p-2 my-2 bg-slate-50 rounded-xl'>
			<View className='p-2 flex flex-1  flex-row'>
				<View className='mr-4'>
					<Image
						source={source}
						style={{
							height: 50,
							width: 50,
							borderRadius: 25,
						}}
						contentFit='contain'
					/>
				</View>

				<View className='flex flex-1 flex-col justify-center'>
					<View style={{flexDirection: 'row'}}>
						<Text className='flex flex-wrap tracking-widest antialiased' bold>
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

const Associations = () => {
	return (
		<View
			style={{
				height: 'auto',
				backgroundColor: '#e7e8ea',
			}}
			className='flex flex-1 m-2 rounded-xl'>
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

			<View className='flex flex-1 flex-col justify-between p-2'>
				<Link asChild href='/kpna'>
					<Pressable>
						<AssociationItem
							item={{
								source: require('../../assets/images/kpna.png'),
								title: 'Kenya Progressive Nurses Association',
								subtitle: 'Harmony In Nursing the Professional Cure',
							}}
						/>
					</Pressable>
				</Link>

				<Link asChild href='/mak' className='flex-1'>
					<Pressable>
						<AssociationItem
							item={{
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
