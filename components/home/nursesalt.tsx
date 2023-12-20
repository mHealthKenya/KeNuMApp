import { Image, ImageSource } from 'expo-image';
import { Href, Link } from 'expo-router';
import React, { FC } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Divider, Icon } from 'react-native-paper';

type Item = {
	height: number;
	width: number;
	title: string;
	source: ImageSource;
	href: Href<string>;
};

type SubItem = Pick<Item, 'source' | 'title' | 'href'>;

type NurseItem = Omit<Item, 'source' | 'href'> & {
	actionTitle?: string;
	more?: Href<string>;
	items: SubItem[];
};

const ModuleItem: FC<{ item: Item }> = ({ item }) => {
	return (
		<Link href={item.href} asChild>
			<Pressable
				className='flex flex-col rounded-xl'
				style={[
					{
						height: 'auto',
						width: item.width * 0.45,
					},
				]}>
				<View className='my-2 justify-center items-center '>
					<Image
						source={item.source}
						style={{
							height: item.height * 0.15,
							width: item.width * 0.38,
						}}
					/>
				</View>

				<View className='my-2'>
					<Text className='text-base text-center tracking-widest'>
						{item.title}
					</Text>
				</View>
			</Pressable>
		</Link>
	);
};

const NursesAltComponent: FC<{ item: NurseItem }> = ({ item }) => {
	return (
		<View
			className='m-2 rounded-xl shadow-xl'
			style={{
				height: 'auto',
				backgroundColor: '#ffffff',
				paddingBottom: 15,
			}}>
			<View className='flex flex-row justify-between p-2 my-3'>
				<Text className='font-bold text-xl tracking-widest'>{item.title}</Text>
				{item.actionTitle && item.more ? (
					<Link href={item.more} asChild>
						<Pressable className='flex flex-row justify-center items-center'>
							<Text
								className='text-base tracking-widest font-light'
								style={{
									color: '#339934',
								}}>
								{item.actionTitle}
							</Text>
							<Icon source='arrow-right-thin' size={20} color='#339934' />
						</Pressable>
					</Link>
				) : null}
			</View>

			<View className='flex flex-row justify-between my-1 p-1'>
				{item.items.map((val, index) => (
					<React.Fragment key={index}>
						<ModuleItem
							item={{
								width: item.width,
								height: item.height,
								title: val.title,
								source: val.source,
								href: val.href,
							}}
						/>

						{index == 0 && <Divider style={{ width: 1, height: '100%' }} />}
					</React.Fragment>
				))}
			</View>
		</View>
	);
};

export default NursesAltComponent;
