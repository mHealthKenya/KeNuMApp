import { Image, ImageSource } from 'expo-image';
import { Href, Link } from 'expo-router';
import React, { FC } from 'react';
import { Pressable, Text, View, FlatList } from 'react-native';
import { Icon } from 'react-native-paper';

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
        className="flex flex-row rounded-xl items-center justify-between"
        style={{
          height: 'auto',
          width: '48%', // Adjust to fit two items per row with spacing
          padding: 10,
          backgroundColor: '#f9f9f9',
          marginBottom: 8,
        }}>
        {/* Text Section */}
        <View style={{ flex: 1 }}>
          <Text
            className="text-base tracking-widest"
            style={{ textAlign: 'left', color: '#333' }}>
            {item.title}
          </Text>
        </View>

        {/* Image Section */}
        <View>
          <Image
            source={item.source}
            style={{
              height: item.height * 0.04,
              width: item.width * 0.09,
            }}
          />
        </View>
      </Pressable>
    </Link>
  );
};

const NursesAltComponent: FC<{ item: NurseItem }> = ({ item }) => {

	return (
		<View
			className='m-2 rounded-xl shadow-md'
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


      {/* Items Section */}
      <FlatList
        data={item.items}
        keyExtractor={(val, index) => `${val.title}-${index}`}
        numColumns={2} // Two items per row
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginVertical: 5, // Adjust spacing between rows
        }}
        renderItem={({ item: val }) => (
          <ModuleItem
            item={{
              width: item.width,
              height: item.height,
              title: val.title,
              source: val.source,
              href: val.href,
            }}
          />
        )}
      />
    </View>
  );
};

export default NursesAltComponent;
