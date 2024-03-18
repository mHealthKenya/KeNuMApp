import {FlashList} from '@shopify/flash-list';
import dayjs from 'dayjs';
import React, {FC, useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Divider, Searchbar} from 'react-native-paper';
import {CPDActivity} from '../../models/activity';
import {useSearch} from '../../providers/search';
import globalStyles from '../../styles/global';
import EmptyList from '../shared/EmptyList';

const CPDActivityBox: FC<{activity: CPDActivity}> = ({activity}) => {
	return (
		<View style={styles.card}>
			<View style={{padding: 10}}>
				<View style={[globalStyles.column, {gap: 10}]}>
					<Text style={styles.mutedText}>Activity</Text>
					<Text style={styles.titleText}>{activity.activity}</Text>
					<Divider />
				</View>
			</View>
			<View style={{padding: 10}}>
				<View style={[globalStyles.column, {gap: 10}]}>
					<Text style={styles.mutedText}>Provider</Text>
					<Text style={styles.titleText}>{activity.provider}</Text>
					<Divider />
				</View>
			</View>

			<View style={{padding: 10}}>
				<View style={[globalStyles.column, {gap: 10}]}>
					<Text style={styles.mutedText}>Location</Text>
					<Text style={styles.titleText}>{activity.activity_location}</Text>
					<Divider />
				</View>
			</View>

			<View style={{padding: 10}}>
				<View style={[globalStyles.column, {gap: 10}]}>
					<Text style={styles.mutedText}>Date</Text>
					<Text style={styles.titleText}>{dayjs(new Date(activity.activity_date)).format('YYYY-MM-DD')}</Text>
					<Divider />
				</View>
			</View>

			<View style={{padding: 10}}>
				<View style={[globalStyles.column, {gap: 10}]}>
					<Text style={styles.mutedText}>Approval Status</Text>
					<Text style={styles.titleText}>{activity.approval_status}</Text>
					<Divider />
				</View>
			</View>

			<View style={{padding: 10}}>
				<View style={[globalStyles.column, {gap: 10}]}>
					<Text style={styles.mutedText}>Approval Comments</Text>
					<Text style={styles.titleText}>{activity.approval_comments}</Text>
					<Divider />
				</View>
			</View>

			<View style={{padding: 10}}>
				<View style={[globalStyles.column, {gap: 10}]}>
					<Text style={styles.mutedText}>Points Earned</Text>
					<Text style={styles.titleText}>{activity.points_earned}</Text>
				</View>
			</View>
		</View>
	);
};

const CPDActivitiesComponent: FC<{
	activities: CPDActivity[];
	refresh: () => {};
	isRefetching: boolean;
}> = ({activities, refresh, isRefetching}) => {
	const {search, handleSearch} = useSearch();

	const items = useMemo(
		() =>
			activities.filter(
				(item) =>
					item.activity.toLowerCase().includes(search.toLowerCase()) ||
					item.activity_location.toLowerCase().includes(search.toLowerCase()) ||
					dayjs(new Date(item.activity_date)).format('YYYY-MM-DD').toLowerCase().includes(search.toLowerCase())
			),
		[search, activities]
	);

	return (
		<View style={globalStyles.container}>
			<Searchbar
				placeholder='Search by activity, location, or date'
				onChangeText={handleSearch}
				value={search}
				style={styles.searchBar}
			/>
			<FlashList
				renderItem={({item}) => {
					return <CPDActivityBox activity={item} />;
				}}
				getItemType={(item) => {
					return item.activity;
				}}
				data={items}
				refreshing={isRefetching}
				onRefresh={refresh}
				ListEmptyComponent={
					<EmptyList message='No CPD activities found. If you think this is an error, please retry later. If this persists, please contact support.' />
				}
				estimatedItemSize={150}
			/>
		</View>
	);
};

export default CPDActivitiesComponent;

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
