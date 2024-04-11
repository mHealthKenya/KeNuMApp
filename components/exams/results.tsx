import {FlashList} from '@shopify/flash-list';
import React, {FC, useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Divider, Searchbar} from 'react-native-paper';
import {ExamResult} from '../../models/results';
import globalStyles from '../../styles/global';
import EmptyList from '../shared/EmptyList';
import AccordionShared from '../shared/Accordion';
import {useSearch} from '../../providers/search';

const ResultBox: FC<{result: ExamResult}> = ({result}) => {
	return (
		<View>
			<View style={{padding: 10}}>
				<View style={[globalStyles.column, {gap: 10}]}>
					<Text style={styles.mutedText}>Name</Text>
					<Text style={styles.titleText}>{result.full_name}</Text>
					<Divider />
				</View>
			</View>
			<View style={{padding: 10}}>
				<View style={[globalStyles.column, {gap: 10}]}>
					<Text style={styles.mutedText}>Series</Text>
					<Text style={styles.titleText}>{result.series}</Text>
					<Divider />
				</View>
			</View>

			<View style={{padding: 10}}>
				<View style={[globalStyles.column, {gap: 10}]}>
					<Text style={styles.mutedText}>Training Institution</Text>
					<Text style={styles.titleText}>{result.training_institution}</Text>
					<Divider />
				</View>
			</View>

			<View style={{padding: 10}}>
				<View style={[globalStyles.column, {gap: 10}]}>
					<Text style={styles.mutedText}>Cadre</Text>
					<Text style={styles.titleText}>{result.cadre}</Text>
					<Divider />
				</View>
			</View>

			<View style={{padding: 10}}>
				<View style={[globalStyles.column, {gap: 10}]}>
					<Text style={styles.mutedText}>Grading Method</Text>
					<Text style={styles.titleText}>{result.grading_method}</Text>
					<Divider />
				</View>
			</View>

			<View style={{padding: 10}}>
				<View style={[globalStyles.column, {gap: 10}]}>
					<Text style={styles.mutedText}>Score Paper One</Text>
					<Text style={styles.titleText}>{result.score_paper_one}</Text>
				</View>
			</View>

			<View style={{padding: 10}}>
				<View style={[globalStyles.column, {gap: 10}]}>
					<Text style={styles.mutedText}>Score Paper Two</Text>
					<Text style={styles.titleText}>{result.score_paper_two}</Text>
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
		<View style={globalStyles.container}>
			<Searchbar
				placeholder='Search by cadre, overall score, or series'
				onChangeText={handleSearch}
				value={search}
				style={styles.searchBar}
			/>
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
	card: {
		backgroundColor: '#FFF',
		borderRadius: 10,
		padding: 10,
		shadowColor: '#dcf0fa',
		shadowOffset: {
			width: 0,
			height: 10,
		},
		shadowOpacity: 0.9,
		shadowRadius: 6,
		elevation: 14,
		margin: 10,
	},

	mutedText: {
		color: '#4e4e4e',
		fontSize: 14,
		letterSpacing: 1.5,
		textTransform: 'capitalize',
	},

	titleText: {
		color: '#3f51b5',
		fontSize: 16,
		letterSpacing: 2,
		textTransform: 'capitalize',
	},
	searchBar: {
		backgroundColor: '#dbe6f5',
		margin: 5,
		padding: 2,
		borderRadius: 10,
	},
});
