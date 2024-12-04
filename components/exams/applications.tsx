import {BottomSheetModal, BottomSheetModalProvider, BottomSheetView} from '@gorhom/bottom-sheet';
import {FlashList} from '@shopify/flash-list';
import dayjs from 'dayjs';
import {useAtom} from 'jotai';
import React, {FC, useCallback, useMemo, useRef} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Searchbar} from 'react-native-paper';
import {examAtom} from '../../atoms/exam';
import {currencyFormatter} from '../../helpers/currency-formatter';
import {ExamApplication} from '../../models/examapplications';
import {useSearch} from '../../providers/search';
import globalStyles from '../../styles/global';
import {InternshipItem, InternshipItemDouble} from '../internship/history/applications';
import AccordionShared from '../shared/Accordion';
import EmptyList from '../shared/EmptyList';
import DownloadInvoice from './actions/downloadinvoice';
import DownloadReceipt from './actions/downloadreceipt';
import PayForApplication from './actions/pay';
import {Text} from '../Themed';

const Application: FC<{
	application: ExamApplication;
	action: (application: ExamApplication) => void;
}> = ({application, action}) => {
	return (
		<Pressable onPress={() => action(application)}>
			<View style={[globalStyles.column]}>
				<InternshipItem title='Exam Series' content={application.exams_series} />
				<InternshipItem title='Cadre' content={application.cadre} />

				<InternshipItem title='Date' content={dayjs(new Date(application.application_date)).format('YYYY-MM-DD')} />

				<InternshipItemDouble
					title='Invoice'
					subtitle='Invoice Number'
					content={application.invoice_no}
					subtitle1='Amount'
					content1={currencyFormatter.format(+application.amount_due)}
				/>

				<InternshipItemDouble
					title='Amount'
					subtitle='Amount Paid'
					content={currencyFormatter.format(+application.amount_paid)}
					subtitle1='Balance Due'
					content1={currencyFormatter.format(+application.balance_due)}
				/>
			</View>
		</Pressable>
	);
};

const ExamApplicationsComponent: FC<{
	applications: ExamApplication[];
	refetch: () => void;
	isRefetching: boolean;
}> = ({applications, refetch, isRefetching}) => {
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	const {search, handleSearch} = useSearch();
	const snapPoints = useMemo(() => ['50%', '75%'], []);

	const handlePresentModal = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	const handleSheetChanges = useCallback((index: number) => {
		console.log('handle sheet changes', index);
	}, []);

	const [item, setItem] = useAtom(examAtom);

	const items = useMemo(
		() =>
			applications.filter(
				(item) =>
					item.cadre.toLowerCase().includes(search.toLowerCase()) ||
					item.exams_series.toLowerCase().includes(search.toLowerCase())
			),
		[search, applications]
	);

	const handleItem = (item: ExamApplication) => {
		setItem(item);
		handlePresentModal();
	};
	return (
		<GestureHandlerRootView style={{flex: 1}}>
			<BottomSheetModalProvider>
				<View style={globalStyles.container}>
					<Searchbar placeholder='Search by cadre' onChangeText={handleSearch} value={search} style={styles.searchBar} />
					<BottomSheetModal ref={bottomSheetModalRef} index={1} snapPoints={snapPoints} onChange={handleSheetChanges}>
						<View style={styles.bottomSheet}>
							<BottomSheetView style={[styles.contentContainer]}>
								<PayForApplication item={item} />
							</BottomSheetView>

							<View style={[styles.contentContainer]}>
								<DownloadInvoice item={item} />
							</View>

							<BottomSheetView style={[styles.contentContainer]}>
								<DownloadReceipt item={item} />
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
						keyExtractor={(_, index) => String(index)}
						onRefresh={refetch}
						refreshing={isRefetching}
						estimatedItemSize={150}
						ListEmptyComponent={<EmptyList message='Could not find any exam applications for your account' />}
					/>
				</View>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	);
};

export default ExamApplicationsComponent;

const Title: FC<{item: ExamApplication}> = ({item}) => {
	return (
		<View className='flex flex-col gap-1'>
			<View className='w-full overflow-auto'>
				<Text className='text-xl'>{item.cadre}</Text>
			</View>
			<View className='w-full'>
				<Text italic>{dayjs(new Date(item.application_date)).format('ddd DD MMM YYYY')}</Text>
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
