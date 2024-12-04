import {FlashList} from '@shopify/flash-list';
import {Image, ImageSource} from 'expo-image';
import {Href, Link} from 'expo-router';
import React, {FC} from 'react';
import {Pressable, View} from 'react-native';
import {Icon} from 'react-native-paper';
import {Text} from '../Themed';

type Item = {
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

const ModuleItem: FC<{item: Item}> = ({item}) => {
	return (
		<Link href={item.href} asChild>
			<Pressable className='flex flex-1 flex-row rounded-xl items-center justify-between px-1 gap-2 my-2 mx-1 bg-slate-100 py-2'>
				<View className='flex bg-[#0445b5] rounded-full'>
					<Image
						source={item.source}
						style={{
							height: 50,
							width: 50,
							borderRadius: 25,
						}}
					/>
				</View>
				{/* Text Section */}
				<View style={{flex: 1}}>
					<Text className='text-lg text-[clamp(1rem, 2vw, 2rem)]' style={{textAlign: 'left'}}>
						{item.title}
					</Text>
				</View>

				{/* Image Section */}
			</Pressable>
		</Link>
	);
};

const NursesAltComponent: FC<{item: NurseItem}> = ({item}) => {
	return (
		<View className='m-2 rounded-xl flex bg-[#FFFFFF] p-2'>
			<View className='flex flex-row justify-between p-1 my-3'>
				<Text className='tracking-widest text-xl' bold>
					{item.title}
				</Text>

				{item.actionTitle && item.more ? (
					<Link href={item.more} asChild>
						<Pressable className='flex flex-row justify-center items-center'>
							<Text
								className='text-lg tracking-wide font-light'
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

			{/* Items Section */}
			<FlashList
				data={item.items}
				keyExtractor={(val, index) => `${val.title}-${index}`}
				estimatedItemSize={100}
				numColumns={2} // Two items per row
				// columnWrapperStyle={{
				// 	justifyContent: 'space-between',
				// 	marginVertical: 5, // Adjust spacing between rows
				// }}
				renderItem={({item: val}) => (
					<ModuleItem
						item={{
							title: val.title,
							source: val.source,
							href: val.href,
						}}
					/>
				)}
				nestedScrollEnabled
			/>
		</View>
	);
};

export default NursesAltComponent;
