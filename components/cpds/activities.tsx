import {FlashList} from '@shopify/flash-list';
import dayjs from 'dayjs';
import React, {FC, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Divider, Searchbar} from 'react-native-paper';
import {DateFormat} from '../../enums/date';
import {truncateText} from '../../helpers/truncate';
import {CPDActivity} from '../../models/activity';
import {useSearch} from '../../providers/search';
import AccordionShared from '../shared/Accordion';
import EmptyList from '../shared/EmptyList';
import {Text} from '../Themed';

const CPDActivityBox: FC<{activity: CPDActivity}> = ({activity}) => {
	return (
		<View>
			<View style={{padding: 10}}>
				<View className='flex flex-col gap-2'>
					<Text className="text-['#4e4e4e'] text-lg" bold>
						Activity
					</Text>
					<Text className='text-lg'>{activity.activity}</Text>
					<Divider />
				</View>
			</View>
			<View style={{padding: 10}}>
				<View className='flex flex-col gap-2'>
					<Text className="text-['#4e4e4e'] text-lg" bold>
						Provider
					</Text>
					<Text className='text-lg'>{activity.provider}</Text>
					<Divider />
				</View>
			</View>

			<View style={{padding: 10}}>
				<View className='flex flex-col gap-2'>
					<Text className="text-['#4e4e4e'] text-lg" bold>
						Location
					</Text>
					<Text className='text-lg'>{activity.activity_location}</Text>
					<Divider />
				</View>
			</View>

			<View style={{padding: 10}}>
				<View className='flex flex-col gap-2'>
					<Text className="text-['#4e4e4e'] text-lg" bold>
						Date
					</Text>
					<Text className='text-lg'>{dayjs(new Date(activity.activity_date)).format('YYYY-MM-DD')}</Text>
					<Divider />
				</View>
			</View>

			<View style={{padding: 10}}>
				<View className='flex flex-col gap-2'>
					<Text className="text-['#4e4e4e'] text-lg" bold>
						Approval Status
					</Text>
					<Text className='text-lg'>{activity.approval_status}</Text>
					<Divider />
				</View>
			</View>

			<View style={{padding: 10}}>
				<View className='flex flex-col gap-2'>
					<Text className="text-['#4e4e4e'] text-lg" bold>
						Approval Comments
					</Text>
					<Text className='text-lg'>{activity.approval_comments}</Text>
					<Divider />
				</View>
			</View>

			<View style={{padding: 10}}>
				<View className='flex flex-col gap-2'>
					<Text className="text-['#4e4e4e'] text-lg" bold>
						Points Earned
					</Text>
					<Text className='text-lg'>{activity.points_earned}</Text>
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
					dayjs(new Date(item.activity_date)).format(DateFormat.WITH_DAY).toLowerCase().includes(search.toLowerCase())
			),
		[search, activities]
	);

	return (
		<View className='flex flex-1'>
			<Searchbar
				placeholder='Search by activity location or date'
				onChangeText={handleSearch}
				value={search}
				style={styles.searchBar}
			/>
			<FlashList
				renderItem={({item}) => {
					return (
						<AccordionShared title={<Title item={item} />}>
							<CPDActivityBox activity={item} />
						</AccordionShared>
					);
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

const Title: FC<{item: CPDActivity}> = ({item}) => {
	return (
		<View className='flex flex-col gap-1'>
			<View className='w-full flex'>
				<Text className='text-lg'>
					{truncateText({
						text: item.activity,
						length: 50,
					})}
				</Text>
			</View>
			<View className='w-full '>
				<Text className='text-sm' italic>
					{dayjs(new Date(item.activity_date)).format('ddd DD MMM YYYY')}
				</Text>
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
