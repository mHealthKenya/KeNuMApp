import {BottomSheetModal, BottomSheetModalProvider, BottomSheetView} from '@gorhom/bottom-sheet';
import {FlashList} from '@shopify/flash-list';
import dayjs from 'dayjs';
import {useAtom} from 'jotai';
import React, {FC, useCallback, useMemo, useRef, useState} from 'react';
import {Pressable, StyleSheet, View, useWindowDimensions} from 'react-native';
import {privatePractice} from '../../atoms/privatepractice';
import {currencyFormatter} from '../../helpers/currency-formatter';
import {PracticeApplication} from '../../models/privatepractice';
import globalStyles from '../../styles/global';
import {InternshipItem, InternshipItemDouble} from '../internship/history/applications';
import EmptyList from '../shared/EmptyList';
import DownloadInvoice from './actions/downloadinvoice';
import DownloadReceipt from './actions/downloadreceipt';
import PayForApplication from './actions/pay';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AccordionShared from '../shared/Accordion';
import {useSearch} from '../../providers/search';
import {DateFormat} from '../../enums/date';
import {Searchbar} from 'react-native-paper';
import {Text} from '../Themed';

const Application: FC<{
	application: PracticeApplication;
	action: (application: PracticeApplication) => void;
}> = ({application, action}) => {
	return (
		<Pressable onPress={() => action(application)}>
			<View style={[globalStyles.column]}>
				<InternshipItem title='Practice' content={application.proposed_practice} />
				<InternshipItem title='Practice Mode' content={application.practice_mode} />

				<InternshipItem title='Work Station' content={application.workstation_name} />

				<InternshipItem title='Date' content={dayjs(new Date(application.renewal_date)).format('DD/MM/YYYY')} />

				<InternshipItemDouble
					title='Invoice'
					subtitle='Invoice Number'
					content={application.invoice_details.invoice_number}
					subtitle1='Amount'
					content1={currencyFormatter.format(+application.invoice_details.amount_due)}
				/>

				<InternshipItemDouble
					title='Amount'
					subtitle='Amount Paid'
					content={currencyFormatter.format(+application.invoice_details.amount_paid)}
					subtitle1='Balance Due'
					content1={currencyFormatter.format(+application.invoice_details.balance_due)}
				/>
			</View>
		</Pressable>
	);
};

const PrivatePracticeApplicationsComponent: FC<{
	applications: PracticeApplication[];
	refetch: () => void;
	isRefetching: boolean;
}> = ({applications, refetch, isRefetching}) => {
	const [show, setShow] = useState(false);

	const [item, setItem] = useAtom(privatePractice);

	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	const snapPoints = useMemo(() => ['25%', '50%'], []);

	const handlePresentModal = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	const handleItem = (item: PracticeApplication) => {
		setItem(item);
		setShow(!show);
		handlePresentModal();
	};

	const handleSheetChanges = useCallback((index: number) => {
		console.log('handle sheet changes', index);
	}, []);

	const sortedApplications = useMemo(
		() =>
			applications.sort((a, b) => {
				return new Date(b.renewal_date).getTime() - new Date(a.renewal_date).getTime();
			}),
		[applications]
	);

	const latestApplicationId = sortedApplications[0]?.application_id;

	const {search, handleSearch} = useSearch();

	const items = useMemo(
		() =>
			sortedApplications.filter(
				(item) =>
					item.workstation_name.toLowerCase().includes(search.toLowerCase()) ||
					dayjs(item.renewal_date).format(DateFormat.WITH_DAY).includes(search.toLowerCase())
			),
		[search, sortedApplications]
	);

	return (
		<GestureHandlerRootView style={{flex: 1}}>
			<Searchbar
				placeholder='Search by workstation or date'
				onChangeText={handleSearch}
				value={search}
				style={styles.searchBar}
			/>
			<BottomSheetModalProvider>
				<View style={globalStyles.container}>
					<BottomSheetModal ref={bottomSheetModalRef} index={1} snapPoints={snapPoints} onChange={handleSheetChanges}>
						<View style={styles.bottomSheet}>
							{item?.application_id === latestApplicationId && (
								<BottomSheetView style={[styles.contentContainer]}>
									<PayForApplication item={item || null} />
								</BottomSheetView>
							)}

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

export default PrivatePracticeApplicationsComponent;

const Title: FC<{item: PracticeApplication}> = ({item}) => {
	return (
		<View className='flex flex-col gap-1'>
			<View className='w-full'>
				<Text className='truncate text-lg'>{item.workstation_name}</Text>
			</View>
			<View className='w-full'>
				<Text className='font-extralight' italic>
					{dayjs(new Date(item.renewal_date)).format('ddd DD MMM YYYY')}
				</Text>
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

	bottomSheet: {
		flex: 1,
		padding: 10,
		gap: 10,
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
