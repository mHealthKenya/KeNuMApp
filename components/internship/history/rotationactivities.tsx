import {FlashList} from '@shopify/flash-list';
import dayjs from 'dayjs';
import React, {FC, useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Divider, Searchbar} from 'react-native-paper';
import {RotationActivity} from '../../../models/rotationactivity';
import globalStyles from '../../../styles/global';
import EmptyList from '../../shared/EmptyList';
import AccordionShared from '../../shared/Accordion';
import {useSearch} from '../../../providers/search';
import {DateFormat} from '../../../enums/date';

const RotationsBox: FC<{rotation: RotationActivity}> = ({rotation}) => {
	return (
		<View>
			<View style={{padding: 10}}>
				<View style={[globalStyles.column, {gap: 10}]}>
					<Text style={styles.mutedText}>Internship Center</Text>
					<Text style={styles.titleText}>{rotation.internship_center}</Text>
					<Divider />
				</View>
			</View>

			<View style={{padding: 10}}>
				<View style={[globalStyles.column, {gap: 10}]}>
					<Text style={styles.mutedText}>Internship Area</Text>
					<Text style={styles.titleText}>{rotation.internship_area}</Text>
					<Divider />
				</View>
			</View>

			<View style={{padding: 10}}>
				<View style={[globalStyles.column, {gap: 10}]}>
					<Text style={styles.mutedText}>Competency</Text>
					<Text style={styles.titleText}>{rotation.competency}</Text>
					<Divider />
				</View>
			</View>

			<View style={{padding: 10}}>
				<View style={[globalStyles.column, {gap: 10}]}>
					<Text style={styles.mutedText}>Activity Notes</Text>
					<Text style={styles.titleText}>{rotation.activity_notes}</Text>
					<Divider />
				</View>
			</View>

			<View style={{padding: 10}}>
				<View style={[globalStyles.column, {gap: 10}]}>
					<Text style={styles.mutedText}>Rotation Area</Text>
					<Text style={styles.titleText}>{rotation.rotation_area}</Text>
					<Divider />
				</View>
			</View>

			<View style={{padding: 10}}>
				<View style={[globalStyles.column, {gap: 10}]}>
					<Text style={styles.mutedText}>Activity Date</Text>
					<Text style={styles.titleText}>{dayjs(new Date(rotation.activity_date)).format('DD MMMM YYYY ')}</Text>
				</View>
			</View>
		</View>
	);
};

const RotationActivitiesComponent: FC<{
	rotation: RotationActivity[];
	refresh: () => {};
	isRefetching: boolean;
}> = ({rotation, refresh, isRefetching}) => {
	const {search, handleSearch} = useSearch();

	const items = useMemo(
		() =>
			rotation.filter(
				(item) =>
					item.rotation_area.toLowerCase().includes(search.toLowerCase()) ||
					item.activity_notes.toLowerCase().includes(search.toLowerCase()) ||
					dayjs(new Date(item.activity_date)).format(DateFormat.WITH_DAY).toLowerCase().includes(search.toLowerCase())
			),
		[rotation, search]
	);

	return (
		<View style={globalStyles.container}>
			<Searchbar
				placeholder='Search by notes, rotation area, or date'
				onChangeText={handleSearch}
				value={search}
				style={styles.searchBar}
			/>
			<FlashList
				data={items}
				renderItem={({item}) => (
					<AccordionShared title={<Title item={item} />}>
						<RotationsBox rotation={item} />
					</AccordionShared>
				)}
				keyExtractor={(item) => item.rotation_activity_id}
				onRefresh={refresh}
				refreshing={isRefetching}
				estimatedItemSize={150}
				ListEmptyComponent={<EmptyList message='Could not find any internship rotations under your account' />}
			/>
		</View>
	);
};

export default RotationActivitiesComponent;

const Title: FC<{item: RotationActivity}> = ({item}) => {
	return (
		<View className='flex flex-col justify-between gap-2'>
			<View className='w-full overflow-auto'>
				<Text className='tracking-wide'>{item.rotation_area}</Text>
			</View>
			<View className='w-full'>
				<Text className='italic font-extralight'>{dayjs(new Date(item.activity_date)).format('ddd DD MMM YYYY')}</Text>
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
