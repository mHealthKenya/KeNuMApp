import {BottomSheetModal, BottomSheetModalProvider, BottomSheetView} from '@gorhom/bottom-sheet';
import {FlashList} from '@shopify/flash-list';
import dayjs from 'dayjs';
import {useAtom} from 'jotai';
import React, {FC, useCallback, useMemo, useRef, useState} from 'react';
import {Pressable, StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import {Divider, List, Searchbar} from 'react-native-paper';
import {outmigrationGenAtom} from '../../atoms/outmigration';
import {currencyFormatter} from '../../helpers/currency-formatter';
import {OutmigrationApplication} from '../../models/outmigrations';
import globalStyles from '../../styles/global';
import {InternshipItem, InternshipItemDouble} from '../internship/history/applications';
import EmptyList from '../shared/EmptyList';
import DownloadInvoice from './actions/downloadinvoice';
import DownloadReceipt from './actions/downloadreceipt';
import PayForApplication from './actions/pay';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AccordionShared from '../shared/Accordion';
import {useSearch} from '../../providers/search';

const extractor = (t: string) => {
	let name = '';
	const items = t.split(' ');

	for (const i of items) {
		name += i
			.charAt(0)
			.replace(/[^a-zA-Z0-9]/g, '')
			.toUpperCase();
	}

	return name;
};

export const CustomDrop: FC<{
	application: OutmigrationApplication;
}> = ({application}) => {
	const {width, height} = useWindowDimensions();
	const dimension = Math.min(width, height);

	const availableWidth = dimension - 20;

	const items = useMemo(() => application.verification_cadres.split(','), [application]);

	const [show, setShow] = useState(false);

	const [item, setItem] = useState('');

	const fItems = useMemo(
		() =>
			items.map((item) => ({
				item,
				short: extractor(item),
			})),
		[items]
	);

	const handlePress = (item: string) => {
		setShow(!show);
		setItem(item);
	};

	return (
		<View>
			<View
				style={[
					globalStyles.row,
					{
						justifyContent: 'space-between',
						padding: 10,
					},
				]}>
				<View
					style={[
						globalStyles.row,
						{
							width: availableWidth * 0.25,
							justifyContent: 'space-between',
							padding: 10,
						},
					]}>
					<View style={{justifyContent: 'center'}}>
						<Text style={[styles.itemText, styles.titleText]}>Cadre</Text>
					</View>
					<Divider
						style={{
							width: 1,
							height: '100%',
						}}
					/>
				</View>
				<View
					style={[
						{
							flex: 1,
							padding: 10,
						},
					]}>
					{fItems.map((val, index) => (
						<List.Accordion
							title={val.short}
							expanded={val.item === item && show}
							onPress={() => handlePress(val.item)}
							key={index}>
							<List.Item
								title={
									<View style={{flex: 1}}>
										<Text>{val.item}</Text>
									</View>
								}
							/>
						</List.Accordion>
					))}
				</View>
			</View>
		</View>
	);
};

const Application: FC<{
	application: OutmigrationApplication;
	action: (application: OutmigrationApplication) => void;
}> = ({application, action}) => {
	const {height, width} = useWindowDimensions();

	const dimension = Math.min(width, height);

	const availableWidth = dimension - 20;

	return (
		<Pressable onPress={() => action(application)}>
			<View style={[globalStyles.column]}>
				<InternshipItem availableWidth={availableWidth} title='Country' content={application.country_name} />

				<CustomDrop application={application} />

				<InternshipItem availableWidth={availableWidth} title='Work Station' content={application.application_status} />

				<InternshipItem
					availableWidth={availableWidth}
					title='Date'
					content={dayjs(new Date(application.application_date)).format('DD/MM/YYYY')}
				/>

				<InternshipItemDouble
					title='Invoice'
					subtitle='Invoice Number'
					content={application.invoice_no}
					subtitle1='Amount'
					content1={currencyFormatter.format(+application.amount_due)}
					availableWidth={availableWidth}
				/>

				<InternshipItemDouble
					title='Amount'
					subtitle='Amount Paid'
					content={currencyFormatter.format(+application.amount_paid)}
					subtitle1='Balance Due'
					content1={currencyFormatter.format(+application.balance_due)}
					availableWidth={availableWidth}
				/>
			</View>
		</Pressable>
	);
};

const OutmigrationApplicationsComponent: FC<{
	applications: OutmigrationApplication[];
	refetch: () => void;
	isRefetching: boolean;
}> = ({applications, refetch, isRefetching}) => {
	const [show, setShow] = useState(false);

	const [item, setItem] = useAtom(outmigrationGenAtom);

	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	const snapPoints = useMemo(() => ['25%', '50%'], []);

	const {search, handleSearch} = useSearch();

	const handlePresentModal = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	const handleItem = (item: OutmigrationApplication) => {
		setItem(item);
		setShow(!show);
		handlePresentModal();
	};

	const handleSheetChanges = useCallback((index: number) => {
		console.log('handle sheet changes', index);
	}, []);

	const items = useMemo(
		() => applications.filter((item) => item.country_name.toLowerCase().includes(search.toLowerCase())),
		[search, applications]
	);

	return (
		<GestureHandlerRootView style={{flex: 1}}>
			<Searchbar
				placeholder='Search by country name'
				onChangeText={handleSearch}
				value={search}
				style={styles.searchBar}
			/>
			<BottomSheetModalProvider>
				<View style={globalStyles.container}>
					<BottomSheetModal ref={bottomSheetModalRef} index={1} snapPoints={snapPoints} onChange={handleSheetChanges}>
						<View style={styles.bottomSheet}>
							<BottomSheetView style={[styles.contentContainer]}>
								<PayForApplication item={item || null} />
							</BottomSheetView>

							<View style={[styles.contentContainer]}>
								<DownloadInvoice item={item || null} />
							</View>

							<BottomSheetView style={[styles.contentContainer]}>
								<DownloadReceipt item={item || null} />
							</BottomSheetView>
						</View>
					</BottomSheetModal>
					<FlashList
						data={items}
						renderItem={({item}) => (
							<AccordionShared title={<Title item={item} />}>
								<Application application={item} action={() => handleItem(item)} />
							</AccordionShared>
						)}
						onRefresh={refetch}
						refreshing={isRefetching}
						keyExtractor={(_, index) => String(index)}
						estimatedItemSize={150}
						ListEmptyComponent={<EmptyList message='Could not find any private practice applications in your account' />}
					/>
				</View>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	);
};

export default OutmigrationApplicationsComponent;

const Title: FC<{item: OutmigrationApplication}> = ({item}) => {
	return (
		<View className='flex flex-col gap-1'>
			<View className='w-full'>
				<Text className='truncate'>{item.country_name}</Text>
			</View>
			<View className='w-full'>
				<Text className='font-extralight italic'>{dayjs(new Date(item.application_date)).format('ddd DD MMM YYYY')}</Text>
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

	itemText: {
		textAlign: 'left',
	},

	titleText: {
		color: '#3f51b5',
		fontSize: 16,
		letterSpacing: 2,
		textTransform: 'capitalize',
	},

	bottomSheet: {
		flex: 1,
		padding: 10,
		gap: 10,
	},

	normalText: {
		letterSpacing: 1.5,
		textTransform: 'capitalize',
		fontSize: 16,
	},

	contentContainer: {
		flex: 1,
		justifyContent: 'center',
	},

	searchBar: {
		backgroundColor: '#dbe6f5',
		margin: 5,
		padding: 2,
		borderRadius: 10,
	},
});
