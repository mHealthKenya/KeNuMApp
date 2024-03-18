import {FlashList} from '@shopify/flash-list';
import dayjs from 'dayjs';
import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Divider} from 'react-native-paper';
import {CheckIns} from '../../../models/checkins';
import globalStyles from '../../../styles/global';
import EmptyList from '../../shared/EmptyList';

const CheckinBox: FC<{checkin: CheckIns}> = ({checkin}) => {
	return (
		<View style={styles.card}>
			<View style={{padding: 10}}>
				<View style={[globalStyles.column, {gap: 10}]}>
					<Text style={styles.mutedText}>Internship Center</Text>
					<Text style={styles.titleText}>{checkin.internship_center}</Text>
					<Divider />
				</View>
			</View>
			<View style={{padding: 10}}>
				<View style={[globalStyles.column, {gap: 10}]}>
					<Text style={styles.mutedText}>Nurse In Charge</Text>
					<Text style={styles.titleText}>{checkin.nurse_officer_incharge}</Text>
					<Divider />
				</View>
			</View>

			<View style={{padding: 10}}>
				<View style={[globalStyles.column, {gap: 10}]}>
					<Text style={styles.mutedText}>Nurse In Charge Phone</Text>
					<Text style={styles.titleText}>{checkin.nurse_officer_incharge_mobile}</Text>
					<Divider />
				</View>
			</View>

			<View style={{padding: 10}}>
				<View style={[globalStyles.column, {gap: 10}]}>
					<Text style={styles.mutedText}>Supervisor</Text>
					<Text style={styles.titleText}>{checkin.supervisor}</Text>
					<Divider />
				</View>
			</View>

			<View style={{padding: 10}}>
				<View style={[globalStyles.column, {gap: 10}]}>
					<Text style={styles.mutedText}>Supervisor Phone</Text>
					<Text style={styles.titleText}>{checkin.supervisor_mobile}</Text>
					<Divider />
				</View>
			</View>

			<View style={{padding: 10}}>
				<View style={[globalStyles.column, {gap: 10}]}>
					<Text style={styles.mutedText}>Checkin Date</Text>
					<Text style={styles.titleText}>{dayjs(new Date(checkin.checkin_date)).format('DD MMMM YYYY ')}</Text>
				</View>
			</View>
		</View>
	);
};

const CheckinHistoryComponent: FC<{
	checkins: CheckIns[];
	refresh: () => {};
	isRefetching: boolean;
}> = ({checkins, refresh, isRefetching}) => {
	return (
		<View style={globalStyles.container}>
			<FlashList
				data={checkins}
				renderItem={({item}) => <CheckinBox checkin={item} />}
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
});
