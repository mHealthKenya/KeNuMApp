import React, { FC } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { CPDActivity } from '../../models/activity';
import globalStyles from '../../styles/global';
import { Alert, AlertIcon, AlertText } from '@gluestack-ui/themed';
import { InfoIcon } from '@gluestack-ui/themed';
import EmptyList from '../shared/EmptyList';

const CPDActivityBox: FC<{ activity: CPDActivity }> = ({ activity }) => {
	return (
		<View style={styles.card}>
			<View style={{ padding: 10 }}>
				<View style={[globalStyles.column, { gap: 10 }]}>
					<Text style={styles.mutedText}>Activity</Text>
					<Text style={styles.titleText}>{activity.activity}</Text>
					<Divider />
				</View>
			</View>
			<View style={{ padding: 10 }}>
				<View style={[globalStyles.column, { gap: 10 }]}>
					<Text style={styles.mutedText}>Provider</Text>
					<Text style={styles.titleText}>{activity.provider}</Text>
					<Divider />
				</View>
			</View>
			{/* <View style={{ padding: 10 }}>
				<View style={[globalStyles.column, { gap: 10 }]}>
					<Text style={styles.mutedText}>Category</Text>
					<Text style={styles.titleText}>{activity.activity_category}</Text>
					<Divider />
				</View>
			</View> */}

			<View style={{ padding: 10 }}>
				<View style={[globalStyles.column, { gap: 10 }]}>
					<Text style={styles.mutedText}>Location</Text>
					<Text style={styles.titleText}>{activity.activity_location}</Text>
					<Divider />
				</View>
			</View>

			<View style={{ padding: 10 }}>
				<View style={[globalStyles.column, { gap: 10 }]}>
					<Text style={styles.mutedText}>Approval Status</Text>
					<Text style={styles.titleText}>{activity.approval_status}</Text>
					<Divider />
				</View>
			</View>

			<View style={{ padding: 10 }}>
				<View style={[globalStyles.column, { gap: 10 }]}>
					<Text style={styles.mutedText}>Approval Comments</Text>
					<Text style={styles.titleText}>{activity.approval_comments}</Text>
					<Divider />
				</View>
			</View>

			<View style={{ padding: 10 }}>
				<View style={[globalStyles.column, { gap: 10 }]}>
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
}> = ({ activities, refresh, isRefetching }) => {
	return (
		<View style={globalStyles.container}>
			<FlatList
				data={activities}
				renderItem={({ item }) => <CPDActivityBox activity={item} />}
				keyExtractor={(_item, index) => '' + index}
				onRefresh={refresh}
				refreshing={isRefetching}
				ListEmptyComponent={
					<EmptyList message='No CPD activities found. If you think this is an error, please retry later. If this persists, please contact support.' />
				}
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
});
