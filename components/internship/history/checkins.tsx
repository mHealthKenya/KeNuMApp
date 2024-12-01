import {FlashList} from '@shopify/flash-list';
import dayjs from 'dayjs';
import React, {FC, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Divider, Searchbar} from 'react-native-paper';
import {CheckIns} from '../../../models/checkins';
import globalStyles from '../../../styles/global';
import EmptyList from '../../shared/EmptyList';
import AccordionShared from '../../shared/Accordion';
import {useSearch} from '../../../providers/search';
import {DateFormat} from '../../../enums/date';
import {Text} from '../../Themed';

const CheckinBox: FC<{checkin: CheckIns}> = ({checkin}) => {
	return (
		<View>
			<View style={{padding: 10}}>
				<View style={[globalStyles.column, {gap: 10}]}>
					<Text bold>Internship Center</Text>
					<Text className='text-xl'>{checkin.internship_center}</Text>
					<Divider />
				</View>
			</View>
			<View style={{padding: 10}}>
				<View style={[globalStyles.column, {gap: 10}]}>
					<Text bold>Nurse In Charge</Text>
					<Text className='text-xl'>{checkin.nurse_officer_incharge}</Text>
					<Divider />
				</View>
			</View>

			<View style={{padding: 10}}>
				<View style={[globalStyles.column, {gap: 10}]}>
					<Text bold>Nurse In Charge Phone</Text>
					<Text className='text-xl'>{checkin.nurse_officer_incharge_mobile}</Text>
					<Divider />
				</View>
			</View>

			<View style={{padding: 10}}>
				<View style={[globalStyles.column, {gap: 10}]}>
					<Text bold>Supervisor</Text>
					<Text className='text-xl'>{checkin.supervisor}</Text>
					<Divider />
				</View>
			</View>

			<View style={{padding: 10}}>
				<View style={[globalStyles.column, {gap: 10}]}>
					<Text bold>Supervisor Phone</Text>
					<Text className='text-xl'>{checkin.supervisor_mobile}</Text>
					<Divider />
				</View>
			</View>

			<View style={{padding: 10}}>
				<View style={[globalStyles.column, {gap: 10}]}>
					<Text bold>Checkin Date</Text>
					<Text className='text-xl'>{dayjs(new Date(checkin.checkin_date)).format('DD MMMM YYYY ')}</Text>
				</View>
			</View>
		</View>
	);
};

const CheckinHistoryComponent: FC<{
	checkins: CheckIns[];
	refresh: () => void;
	isRefetching: boolean;
}> = ({checkins, refresh, isRefetching}) => {
	const {search, handleSearch} = useSearch();

	const items = useMemo(
		() =>
			checkins.filter(
				(item) =>
					item.internship_center.toLowerCase().includes(search.toLowerCase()) ||
					dayjs(new Date(item.checkin_date)).format(DateFormat.WITH_DAY).toLowerCase().includes(search.toLowerCase())
			),
		[checkins, search]
	);

	return (
		<View style={globalStyles.container}>
			<Searchbar
				placeholder='Search by internship center or date'
				onChangeText={handleSearch}
				value={search}
				style={styles.searchBar}
			/>
			<FlashList
				data={items}
				renderItem={({item}) => (
					<AccordionShared title={<Title item={item} />}>
						<CheckinBox checkin={item} />
					</AccordionShared>
				)}
				keyExtractor={(item) => item.checkin_id}
				onRefresh={refresh}
				refreshing={isRefetching}
				ListEmptyComponent={<EmptyList message='Could not find any internship checkins in your account' />}
				estimatedItemSize={150}
			/>
		</View>
	);
};

export default CheckinHistoryComponent;

const Title: FC<{item: CheckIns}> = ({item}) => {
	return (
		<View className='flex flex-col justify-between gap-2'>
			<View className='w-full overflow-auto'>
				<Text className='text-xl'>{item.internship_center}</Text>
			</View>
			<View className='w-full'>
				<Text italic>{dayjs(new Date(item.checkin_date)).format('ddd DD MMM YYYY')}</Text>
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
