import {FlashList} from '@shopify/flash-list';
import dayjs from 'dayjs';
import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Divider} from 'react-native-paper';
import {TransferHist} from '../../../models/transferhist';
import globalStyles from '../../../styles/global';
import EmptyList from '../../shared/EmptyList';

const TransferBox: FC<{transfer: TransferHist}> = ({transfer}) => {
	return (
		<View style={styles.card}>
			<View style={{padding: 10}}>
				<View style={[globalStyles.column, {gap: 10}]}>
					<Text style={styles.mutedText}>Center From</Text>
					<Text style={styles.titleText}>{transfer.center_from}</Text>
					<Divider />
				</View>
			</View>

			<View style={{padding: 10}}>
				<View style={[globalStyles.column, {gap: 10}]}>
					<Text style={styles.mutedText}>Center To</Text>
					<Text style={styles.titleText}>{transfer.center_to}</Text>
					<Divider />
				</View>
			</View>

			<View style={{padding: 10}}>
				<View style={[globalStyles.column, {gap: 10}]}>
					<Text style={styles.mutedText}>Transfer Reason</Text>
					<Text style={styles.titleText}>{transfer.transfer_reason_desc}</Text>
					<Divider />
				</View>
			</View>

			<View style={{padding: 10}}>
				<View style={[globalStyles.column, {gap: 10}]}>
					<Text style={styles.mutedText}>Request Date</Text>
					<Text style={styles.titleText}>{dayjs(new Date(transfer.request_date)).format('DD-MMMM-YYYY ')}</Text>

					<Divider />
				</View>
			</View>

			<View style={{padding: 10}}>
				<View style={[globalStyles.column, {gap: 10}]}>
					<Text style={styles.mutedText}>Application Status</Text>
					<Text style={styles.titleText}>{transfer.application_status}</Text>
				</View>
			</View>
		</View>
	);
};

const TransferHistComponent: FC<{
	transfers: TransferHist[];
	refresh: () => {};
	isRefetching: boolean;
}> = ({transfers, refresh, isRefetching}) => {
	return (
		<View style={globalStyles.container}>
			<FlashList
				data={transfers}
				renderItem={({item}) => <TransferBox transfer={item} />}
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
});
