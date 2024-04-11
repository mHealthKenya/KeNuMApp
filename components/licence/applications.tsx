import dayjs from 'dayjs';
import React, {FC, useCallback, useMemo, useRef, useState} from 'react';
import {Pressable, StyleSheet, View, useWindowDimensions, Text} from 'react-native';
import {currencyFormatter} from '../../helpers/currency-formatter';
import {LicenceApplication} from '../../models/licenceapplications';
import globalStyles from '../../styles/global';
import {InternshipItem, InternshipItemDouble} from '../internship/history/applications';
import EmptyList from '../shared/EmptyList';
// import ActionBottomLicence from './actionbottomlicence';
import {BottomSheetModal, BottomSheetModalProvider, BottomSheetView} from '@gorhom/bottom-sheet';
import {FlashList} from '@shopify/flash-list';
import {useAtom} from 'jotai';
import {licenceApplicationAtom} from '../../atoms/licence';
import DownloadInvoice from './actions/downloadinvoice';
import DownloadReceipt from './actions/downloadreceipt';
import PayForApplication from './actions/pay';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AccordionShared from '../shared/Accordion';
import {useSearch} from '../../providers/search';
import {DateFormat} from '../../enums/date';
import {Searchbar} from 'react-native-paper';

const Application: FC<{
	application: LicenceApplication;
	action: (application: LicenceApplication) => void;
}> = ({application, action}) => {
	const {height, width} = useWindowDimensions();

	const dimension = Math.min(width, height);

	const availableWidth = dimension - 20;
	return (
		<Pressable onPress={() => action(application)}>
			<View style={[globalStyles.column]}>
				{application?.workstation_name !== 'DIASPORA' && (
					<InternshipItem availableWidth={availableWidth} title='County' content={application.County} />
				)}
				<InternshipItem availableWidth={availableWidth} title='Station' content={application.workstation_name} />

				{application?.workstation_name !== 'DIASPORA' && (
					<InternshipItem availableWidth={availableWidth} title='Employer' content={application.employer} />
				)}

				<InternshipItem
					availableWidth={availableWidth}
					title='Date'
					content={dayjs(new Date(application.renewal_date)).format(DateFormat.WITH_DAY)}
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

const LicenceApplicationsComponent: FC<{
	applications: LicenceApplication[];
	refetch: () => void;
	isRefetching: boolean;
}> = ({applications, refetch, isRefetching}) => {
	const [show, setShow] = useState(false);

	const [item, setItem] = useAtom(licenceApplicationAtom);

	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	const snapPoints = useMemo(() => ['25%', '50%'], []);

	const handlePresentModal = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	const handleItem = (item: LicenceApplication) => {
		setItem(item);
		setShow(!show);
		handlePresentModal();
	};

	const handleSheetChanges = useCallback((index: number) => {
		console.log('handle sheet changes', index);
	}, []);

	const {search, handleSearch} = useSearch();

	const items = useMemo(
		() =>
			applications.filter(
				(item) =>
					item.workstation_name.toLowerCase().includes(search.toLowerCase()) ||
					item.employer.toLowerCase().includes(search.toLowerCase()) ||
					dayjs(new Date(item.renewal_date)).format(DateFormat.WITH_DAY).toLowerCase().includes(search.toLowerCase())
			),
		[search, applications]
	);

	return (
		<GestureHandlerRootView style={{flex: 1}}>
			<Searchbar
				placeholder='Search by workstation employer or date'
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
						ListEmptyComponent={<EmptyList message='Could not find any licence applications in your account' />}
					/>
				</View>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	);
};

const Title: FC<{item: LicenceApplication}> = ({item}) => {
	return (
		<View className='flex flex-col gap-1'>
			<View className='w-full'>
				<Text className='truncate'>{item.workstation_name}</Text>
			</View>
			<View className='w-full'>
				<Text className='font-extralight italic'>{dayjs(new Date(item.renewal_date)).format('ddd DD MMM YYYY')}</Text>
			</View>
		</View>
	);
};

export default LicenceApplicationsComponent;

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
