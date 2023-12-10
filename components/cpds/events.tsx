import { View, Text, useWindowDimensions } from 'react-native';
import React, { FC, useMemo } from 'react';
import { CPDEvent } from '../../models/cpdevents';
import { StyleSheet } from 'react-native';
import globalStyles from '../../styles/global';
import { Button, Divider, Icon, Searchbar } from 'react-native-paper';
import dayjs from 'dayjs';
import { useSearch } from '../../providers/search';
import { FlatList } from 'react-native';
import EmptyList from '../shared/EmptyList';
import { Alert, BadgeIcon, BadgeText } from '@gluestack-ui/themed';
import { Badge } from '@gluestack-ui/themed';

interface Item {
	title: string;
	title1: string;
	value: string;
	value1: string;
}

const Double: FC<{ item: Item }> = ({ item }) => {
	const { width } = useWindowDimensions();
	return (
		<>
			<View className='flex flex-row justify-between'>
				<View style={{ width: width * 0.46 }}>
					<View style={[globalStyles.column, { gap: 10 }]}>
						<Text style={styles.mutedText}>{item.title}</Text>
						<Text style={styles.titleText}>{item.value}</Text>
					</View>
				</View>
				<View style={{ width: width * 0.46 }}>
					<View style={[globalStyles.column, { gap: 10 }]}>
						<Text style={styles.mutedText}>{item.title1}</Text>
						<Text style={styles.titleText}>{item.value1}</Text>
					</View>
				</View>
			</View>
		</>
	);
};

const CPDEventBox: FC<{ event: CPDEvent }> = ({ event }) => {
	const { width } = useWindowDimensions();
	return (
		<View style={styles.card}>
			<View style={{ padding: 10 }}>
				<View style={[globalStyles.column, { gap: 10 }]}>
					<Text style={styles.mutedText}>Event</Text>
					<Text style={styles.titleText}>{event.event_title}</Text>
					<Divider />
				</View>
			</View>
			<View style={{ padding: 10 }}>
				<View style={[globalStyles.column, { gap: 10 }]}>
					<Text style={styles.mutedText}>Provider</Text>
					<Text style={styles.titleText}>{event.provider}</Text>
					<Divider />
				</View>
			</View>

			<View style={{ padding: 10 }}>
				<View style={[globalStyles.column, { gap: 10 }]}>
					<Text style={styles.mutedText}>Category</Text>
					<Text style={styles.titleText}>{event.category}</Text>
					<Divider />
				</View>
			</View>

			<View style={{ padding: 10 }}>
				<View style={[globalStyles.column, { gap: 10 }]}>
					<Text style={styles.mutedText}>Activity</Text>
					<Text style={styles.titleText}>{event.activity}</Text>
					<Divider />
				</View>
			</View>

			<View style={{ padding: 10 }}>
				<View style={[globalStyles.column, { gap: 10 }]}>
					<Text style={styles.mutedText}>Delivery Mode</Text>
					<Text style={[styles.titleText]}>{event.delivery_mode}</Text>
					<Divider />
				</View>
			</View>

			<View style={{ padding: 10, gap: 10 }}>
				<Double
					item={{
						title: 'Start Date',
						value: dayjs(new Date(event.event_start_date)).format('YYYY-MM-DD'),
						title1: 'End Date',
						value1: dayjs(new Date(event.event_end_date)).format('YYYY-MM-DD'),
					}}
				/>

				<Divider />
			</View>

			{event.attended_event === 'yes' && (
				<View style={{ padding: 10 }}>
					<View style={[globalStyles.column, { gap: 10 }]}>
						<View className='flex flex-row justify-between'>
							<View style={{ width: width * 0.46 }}>
								<View style={[globalStyles.column, { gap: 10 }]}>
									<Text style={styles.mutedText}>Event Code</Text>
									<Text style={[styles.titleText]}>{event.event_token}</Text>
								</View>
							</View>
							<View style={{ width: width * 0.46 }}>
								<View style={[{ gap: 10 }]}>
									{event.token_redeemed === 'no' ? (
										<View style={{ height: 'auto' }}>
											<Button mode='contained' style={styles.button}>
												Claim
											</Button>
										</View>
									) : (
										<View
											style={{
												width: width * 0.42,
												gap: 5,
											}}>
											<Badge
												size='lg'
												variant='solid'
												action='success'
												ml='$1'
												p='$2'>
												<BadgeText>Points Awarded</BadgeText>
												<BadgeIcon
													as={() => (
														<Icon
															source='check-decagram-outline'
															size={20}
															color='green'
														/>
													)}
													ml='$1'
												/>
											</Badge>
										</View>
									)}
								</View>
							</View>
						</View>
						<Divider />
					</View>
				</View>
			)}
		</View>
	);
};

const CPDEventsComponent: FC<{
	events: CPDEvent[];
	refresh: () => void;
	isRefetching: boolean;
}> = ({ events, refresh, isRefetching }) => {
	const { search, handleSearch } = useSearch();

	const items = useMemo(
		() =>
			events.filter(
				(item) =>
					item.activity.toLowerCase().includes(search.toLowerCase()) ||
					item.event_title.toLowerCase().includes(search.toLowerCase()) ||
					dayjs(new Date(item.event_start_date))
						.format('YYYY-MM-DD')
						.toLowerCase()
						.includes(search.toLowerCase())
			),
		[search, events]
	);
	return (
		<View style={globalStyles.container}>
			<Searchbar
				placeholder='Search by title, activity, or start date'
				onChangeText={handleSearch}
				value={search}
				style={styles.searchBar}
			/>

			<FlatList
				data={items}
				renderItem={({ item }) => <CPDEventBox event={item} />}
				keyExtractor={(_item, index) => '' + index}
				onRefresh={refresh}
				refreshing={isRefetching}
				ListEmptyComponent={
					<EmptyList message='No CPD events found. If you think this is an error, please retry later. If this persists, please contact support.' />
				}
			/>
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

	button: {
		backgroundColor: 'green',
		padding: 2,
		borderRadius: 10,
		width: '70%',
	},
});

export default CPDEventsComponent;
