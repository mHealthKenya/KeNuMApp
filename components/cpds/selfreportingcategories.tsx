import {
	FlatList,
	Pressable,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from 'react-native';
import React, { FC } from 'react';
import { CPDCategory } from '../../models/cpdcategory';
import { useRouter } from 'expo-router';
import { ImageSource } from 'expo-image';
import globalStyles from '../../styles/global';
import { Divider, Icon } from 'react-native-paper';
import { useCPDCategoryFetched } from '../../providers/cpdcategories';

const Category: FC<{ category: CPDCategory }> = ({ category }) => {
	const { width, height } = useWindowDimensions();
	const actualWidth = Math.min(width, height);
	const usableWidth = actualWidth - 20;

	const { handleCategoryId } = useCPDCategoryFetched();

	const router = useRouter();

	const handlePush = (category: CPDCategory) => {
		handleCategoryId(category.category_id);
		router.push('/selfreporting');
	};

	return (
		<Pressable
			style={[
				styles.box,
				{
					width: usableWidth,
					backgroundColor: '#dcf0fa',
					flex: 1,
				},
			]}
			onPress={() => handlePush(category)}>
			<View
				style={[
					globalStyles.row,
					{ justifyContent: 'space-between', alignItems: 'center' },
				]}>
				<View
					style={[
						globalStyles.column,
						{
							width: usableWidth * 0.8,
						},
					]}>
					<View
						style={{
							padding: 10,
						}}>
						<Text style={styles.contentText}>{category.category}</Text>
					</View>
				</View>
				<Icon size={30} source='chevron-right' />
			</View>
		</Pressable>
	);
};

const SelfReportingCategoriesComponent: FC<{
	categories: CPDCategory[];
	refresh: () => void;
	isRefreshing: boolean;
}> = ({ categories, refresh, isRefreshing }) => {
	return (
		<FlatList
			data={categories}
			renderItem={({ item }) => <Category category={item} />}
			keyExtractor={(item) => item.category_id}
			refreshing={isRefreshing}
			onRefresh={refresh}
		/>
	);
};

export default SelfReportingCategoriesComponent;

const styles = StyleSheet.create({
	box: {
		margin: 10,
		padding: 20,
		borderRadius: 10,
		justifyContent: 'center',
	},

	fullSize: {
		justifyContent: 'space-evenly',
	},

	titleText: {
		fontSize: 16,
		fontWeight: 'bold',
		textTransform: 'capitalize',
		letterSpacing: 2,
	},

	contentText: {
		color: 'black',
		letterSpacing: 2,
		fontSize: 18,
	},
});
