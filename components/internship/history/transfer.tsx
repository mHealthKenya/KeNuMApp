import {FlashList} from '@shopify/flash-list';
import dayjs from 'dayjs';
import React, {FC, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Divider, Searchbar} from 'react-native-paper';
import {TransferHist} from '../../../models/transferhist';
import globalStyles from '../../../styles/global';
import EmptyList from '../../shared/EmptyList';
import AccordionShared from '../../shared/Accordion';
import {useSearch} from '../../../providers/search';
import {DateFormat} from '../../../enums/date';
import {Text} from '../../Themed';

const TransferBox: FC<{transfer: TransferHist}> = ({transfer}) => {
	return (
		<View>
			<View style={{padding: 10}}>
				<View style={[globalStyles.column, {gap: 10}]}>
					<Text bold>Center From</Text>
					<Text className='text-xl'>{transfer.center_from}</Text>
					<Divider />
				</View>
			</View>

			<View style={{padding: 10}}>
				<View style={[globalStyles.column, {gap: 10}]}>
					<Text bold>Center To</Text>
					<Text className='text-xl'>{transfer.center_to}</Text>
					<Divider />
				</View>
			</View>

			<View style={{padding: 10}}>
				<View style={[globalStyles.column, {gap: 10}]}>
					<Text bold>Transfer Reason</Text>
					<Text className='text-xl'>{transfer.transfer_reason_desc}</Text>
					<Divider />
				</View>
			</View>

			<View style={{padding: 10}}>
				<View style={[globalStyles.column, {gap: 10}]}>
					<Text bold>Request Date</Text>
					<Text className='text-xl'>{dayjs(new Date(transfer.request_date)).format(DateFormat.WITH_DAY)}</Text>

					<Divider />
				</View>
			</View>

			<View style={{padding: 10}}>
				<View style={[globalStyles.column, {gap: 10}]}>
					<Text bold>Application Status</Text>
					<Text className='text-xl'>{transfer.application_status}</Text>
				</View>
			</View>
		</View>
	);
};

const TransferHistComponent: FC<{
	transfers: TransferHist[];
	refresh: () => void;
	isRefetching: boolean;
}> = ({transfers, refresh, isRefetching}) => {
	const {search, handleSearch} = useSearch();

	const items = useMemo(
		() =>
			transfers.filter(
				(item) =>
					item.center_from.toLowerCase().includes(search.toLowerCase()) ||
					item.center_to.toLowerCase().includes(search.toLowerCase()) ||
					dayjs(new Date(item.request_date)).format(DateFormat.WITH_DAY).toLowerCase().includes(search.toLowerCase())
			),
		[transfers, search]
	);

	return (
		<View style={globalStyles.container}>
			<Searchbar placeholder='Search by from or to' onChangeText={handleSearch} value={search} style={styles.searchBar} />
			<FlashList
				data={items}
				renderItem={({item}) => (
					<AccordionShared title={<Title item={item} />}>
						<TransferBox transfer={item} />
					</AccordionShared>
				)}
				keyExtractor={(item) => item.transfer_request_id}
				onRefresh={refresh}
				refreshing={isRefetching}
				ListEmptyComponent={<EmptyList message='Could not find any internship transfer requests under your account' />}
				estimatedItemSize={150}
			/>
		</View>
	);
};

export default TransferHistComponent;

const Title: FC<{item: TransferHist}> = ({item}) => {
	return (
		<View className='flex flex-col justify-between gap-2'>
			<View className='w-full overflow-auto'>
				<Text className='text-xl'>{item.center_to}</Text>
			</View>
			<View className='w-full'>
				<Text italic>{dayjs(new Date(item.request_date)).format('ddd DD MMM YYYY')}</Text>
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
	},

	titleText: {
		color: '#3f51b5',
		fontSize: 18,
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
