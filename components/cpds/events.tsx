import {Badge, BadgeIcon, BadgeText} from '@gluestack-ui/themed';
import {FlashList} from '@shopify/flash-list';
import dayjs from 'dayjs';
import React, {FC, useMemo} from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import {Button, Divider, Icon, Searchbar} from 'react-native-paper';
import {CPDEvent} from '../../models/cpdevents';
import {useSearch} from '../../providers/search';
import useClaim from '../../services/cpds/claim';
import globalStyles from '../../styles/global';
import EmptyList from '../shared/EmptyList';
import AccordionShared from '../shared/Accordion';
import {truncateText} from '../../helpers/truncate';
import {DateFormat} from '../../enums/date';
import {Text} from '../Themed';

interface Item {
	title: string;
	title1: string;
	value: string;
	value1: string;
}

const Double: FC<{item: Item}> = ({item}) => {
	const {width} = useWindowDimensions();
	return (
		<>
			<View className='flex flex-row justify-between'>
				<View style={{width: width * 0.46}}>
					<View className='flex flex-col gap-2'>
						<Text className="text-['#4e4e4e'] text-lg">{item.title}</Text>
						<Text className='text-xl'>{item.value}</Text>
					</View>
				</View>
				<View style={{width: width * 0.46}}>
					<View className='flex flex-col gap-2'>
						<Text className='text-[#4e4e4e] text-lg'>{item.title1}</Text>
						<Text className='text-xl'>{item.value1}</Text>
					</View>
				</View>
			</View>
		</>
	);
};

const CPDEventBox: FC<{event: CPDEvent}> = ({event}) => {
	const successFn = () => {
		console.log('success');
	};
	const {mutate, isPending} = useClaim(successFn);
	const {width} = useWindowDimensions();

	const handleSubmit = () => {
		mutate({
			event_token: event.event_token,
			index_id: event.index_id,
		});
	};

	return (
		<View>
			<View className='p-2'>
				<View className='flex flex-col gap-2'>
					<Text className='text-[#4e4e4e] text-lg'>Event</Text>
					<Text className='text-xl'>{event.event_title}</Text>
					<Divider />
				</View>
			</View>
			<View className='p-2'>
				<View className='flex flex-col gap-2'>
					<Text className='text-[#4e4e4e] text-lg'>Provider</Text>
					<Text className='text-xl'>{event.provider}</Text>
					<Divider />
				</View>
			</View>

			<View className='p-2'>
				<View className='flex flex-col gap-2'>
					<Text className='text-[#4e4e4e] text-lg'>Category</Text>
					<Text className='text-xl'>{event.category}</Text>
					<Divider />
				</View>
			</View>

			<View className='p-2'>
				<View className='flex flex-col gap-2'>
					<Text className='text-[#4e4e4e] text-lg'>Activity</Text>
					<Text className='text-xl'>{event.activity}</Text>
					<Divider />
				</View>
			</View>

			<View className='p-2'>
				<View className='flex flex-col gap-2'>
					<Text className='text-[#4e4e4e] text-lg'>Delivery Mode</Text>
					<Text className='text-xl'>{event.delivery_mode}</Text>
					<Divider />
				</View>
			</View>

			<View style={{padding: 10, gap: 10}}>
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
				<View className='p-2'>
					<View className='flex flex-col gap-2'>
						<View className='flex flex-row justify-between'>
							<View style={{width: width * 0.46}}>
								<View className='flex flex-col gap-2'>
									<Text className='text-[#4e4e4e] text-lg'>Event Code</Text>
									<Text>{event.event_token}</Text>
								</View>
							</View>
							<View style={{width: width * 0.46}}>
								<View style={[{gap: 10}]}>
									{event.token_redeemed === 'no' ? (
										<View style={{height: 'auto'}}>
											<Button mode='contained' style={styles.button} onPress={handleSubmit} loading={isPending}>
												Claim
											</Button>
										</View>
									) : (
										<View
											style={{
												width: width * 0.42,
												gap: 5,
											}}>
											<Badge size='lg' variant='solid' action='success' ml='$1' p='$2'>
												<BadgeText>Points Awarded</BadgeText>
												<BadgeIcon as={() => <Icon source='check-decagram-outline' size={20} color='green' />} ml='$1' />
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
}> = ({events, refresh, isRefetching}) => {
	const {search, handleSearch} = useSearch();

	const items = useMemo(
		() =>
			events?.filter(
				(item) =>
					item.activity.toLowerCase().includes(search.toLowerCase()) ||
					item.event_title.toLowerCase().includes(search.toLowerCase()) ||
					dayjs(new Date(item.event_start_date)).format(DateFormat.WITH_DAY).toLowerCase().includes(search.toLowerCase())
			),
		[search, events]
	);
	return (
		<View style={globalStyles.container}>
			<Searchbar placeholder='Search by title' onChangeText={handleSearch} value={search} style={styles.searchBar} />

			<FlashList
				data={items}
				renderItem={({item}) => (
					<AccordionShared title={<Title item={item} />}>
						<CPDEventBox event={item} />
					</AccordionShared>
				)}
				keyExtractor={(_item, index) => '' + index}
				onRefresh={refresh}
				refreshing={isRefetching}
				ListEmptyComponent={
					<EmptyList message='No CPD events found. If you think this is an error, please retry later. If this persists, please contact support.' />
				}
				estimatedItemSize={150}
			/>
		</View>
	);
};

const Title: FC<{item: CPDEvent}> = ({item}) => {
	return (
		<View className='flex flex-col gap-1'>
			<View className='w-full flex'>
				<Text className='text-xl'>
					{truncateText({
						text: item.activity,
						length: 50,
					})}
				</Text>
			</View>
			<View className='w-full'>
				<Text className='text-lg' italic>
					{dayjs(new Date(item.event_start_date)).format('ddd DD MMM YYYY')}
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

	button: {
		backgroundColor: 'green',
		padding: 2,
		borderRadius: 10,
		width: '70%',
	},
});

export default CPDEventsComponent;
