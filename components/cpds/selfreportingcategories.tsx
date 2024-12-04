import {FlashList} from '@shopify/flash-list';
import {useRouter} from 'expo-router';
import React, {FC} from 'react';
import {Pressable, View} from 'react-native';
import {Icon} from 'react-native-paper';
import {CPDCategory} from '../../models/cpdcategory';
import {useCPDCategoryFetched} from '../../providers/cpdcategories';
import EmptyList from '../shared/EmptyList';
import {Text} from '../Themed';

const Category: FC<{category: CPDCategory}> = ({category}) => {
	const {handleCategoryId} = useCPDCategoryFetched();

	const router = useRouter();

	const handlePush = (category: CPDCategory) => {
		handleCategoryId(category.category_id);
		router.push('/selfreporting');
	};

	return (
		<Pressable className='bg-white m-2 p-3 rounded-lg' onPress={() => handlePush(category)}>
			<View className='flex flex-1 flex-row gap-2'>
				<View className='flex flex-1'>
					<View>
						<Text className='text-lg'>{category.category}</Text>
					</View>
				</View>
				<View className='flex justify-center items-center'>
					<Icon size={30} source='chevron-right' />
				</View>
			</View>
		</Pressable>
	);
};

const SelfReportingCategoriesComponent: FC<{
	categories: CPDCategory[];
	refresh: () => void;
	isRefreshing: boolean;
}> = ({categories, refresh, isRefreshing}) => {
	return (
		<FlashList
			data={categories}
			renderItem={({item}) => <Category category={item} />}
			keyExtractor={(item) => item.category_id}
			refreshing={isRefreshing}
			onRefresh={refresh}
			ListEmptyComponent={
				<EmptyList message='Could not load CPD categories. Please check your internet connection and try again.' />
			}
			estimatedItemSize={150}
		/>
	);
};

export default SelfReportingCategoriesComponent;
