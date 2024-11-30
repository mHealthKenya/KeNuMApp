import {FlashList} from '@shopify/flash-list';
import React, {FC, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Divider, Searchbar} from 'react-native-paper';
import {ExamResult} from '../../models/results';
import {useSearch} from '../../providers/search';
import AccordionShared from '../shared/Accordion';
import EmptyList from '../shared/EmptyList';
import {Text} from '../Themed';

const ResultBox: FC<{result: ExamResult}> = ({result}) => {
	return (
		<View>
			<View className='p-2'>
				<View className='flex flex-col gap-2'>
					<Text>Name</Text>
					<Text className='text-lg'>{result.full_name}</Text>
					<Divider />
				</View>
			</View>
			<View className='p-2'>
				<View className='flex flex-col gap-2'>
					<Text>Series</Text>
					<Text className='text-lg'>{result.series}</Text>
					<Divider />
				</View>
			</View>

			<View className='p-2'>
				<View className='flex flex-col gap-2'>
					<Text>Training Institution</Text>
					<Text className='text-lg'>{result.training_institution}</Text>
					<Divider />
				</View>
			</View>

			<View className='p-2'>
				<View className='flex flex-col gap-2'>
					<Text>Cadre</Text>
					<Text className='text-lg'>{result.cadre}</Text>
					<Divider />
				</View>
			</View>

			<View className='p-2'>
				<View className='flex flex-col gap-2'>
					<Text>Grading Method</Text>
					<Text className='text-lg'>{result.grading_method}</Text>
					<Divider />
				</View>
			</View>

			<View className='p-2'>
				<View className='flex flex-col gap-2'>
					<Text>Score Paper One</Text>
					<Text className='text-lg'>{result.score_paper_one}</Text>
				</View>
			</View>

			<View className='p-2'>
				<View className='flex flex-col gap-2'>
					<Text>Score Paper Two</Text>
					<Text className='text-lg'>{result.score_paper_two}</Text>
				</View>
			</View>
		</View>
	);
};

const ExamResultsComponent: FC<{
	results: ExamResult[];
	refresh: () => {};
	isRefetching: boolean;
}> = ({results, refresh, isRefetching}) => {
	const {search, handleSearch} = useSearch();

	const items = useMemo(
		() =>
			results.filter(
				(item) =>
					item.cadre.toLowerCase().includes(search.toLowerCase()) ||
					item.overall_score.toLowerCase().includes(search.toLowerCase()) ||
					item.series.toLowerCase().includes(search.toLowerCase())
			),
		[search]
	);

	return (
		<View className='flex flex-1'>
			<Searchbar placeholder='Search by cadre' onChangeText={handleSearch} value={search} style={styles.searchBar} />
			<FlashList
				data={items}
				renderItem={({item}) => (
					<AccordionShared title={<Title item={item} />}>
						<ResultBox result={item} />
					</AccordionShared>
				)}
				keyExtractor={(item, index) => '' + index}
				onRefresh={refresh}
				refreshing={isRefetching}
				ListEmptyComponent={<EmptyList message='Could not find any exam results in your account.' />}
				estimatedItemSize={150}
			/>
		</View>
	);
};

export default ExamResultsComponent;

const Title: FC<{item: ExamResult}> = ({item}) => {
	return (
		<View className='flex flex-col justify-between gap-2'>
			<View className='w-full overflow-auto'>
				<Text className='tracking-wide'>{item.cadre}</Text>
			</View>
			<View className='w-full'>
				<Text className='italic font-extralight'>{item.overall_score}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	searchBar: {
		backgroundColor: '#dbe6f5',
		margin: 5,
		padding: 2,
		borderRadius: 10,
	},
});
