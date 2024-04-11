import {BottomSheetModal, BottomSheetModalProvider, BottomSheetView} from '@gorhom/bottom-sheet';
import {FlashList} from '@shopify/flash-list';
import dayjs from 'dayjs';
import {useAtom} from 'jotai';
import React, {FC, useCallback, useMemo, useRef, useState} from 'react';
import {Pressable, StyleSheet, View, useWindowDimensions, Text} from 'react-native';
import {registrationAtom} from '../../atoms/registration';
import {currencyFormatter} from '../../helpers/currency-formatter';
import {RegistrationApplication} from '../../models/regapplications';
import globalStyles from '../../styles/global';
import {InternshipItem, InternshipItemDouble} from '../internship/history/applications';
import EmptyList from '../shared/EmptyList';
import DownloadInvoice from './actions/downloadinvoice';
import DownloadReceipt from './actions/downloadreceipt';
import PayForApplication from './actions/pay';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AccordionShared from '../shared/Accordion';

const Application: FC<{
	application: RegistrationApplication;
	action: (application: RegistrationApplication) => void;
}> = ({application, action}) => {
	const {height, width} = useWindowDimensions();

	const dimension = Math.min(width, height);

	const availableWidth = dimension - 20;
	return (
		<Pressable onPress={() => action(application)}>
			<View style={[globalStyles.column]}>
				<InternshipItem availableWidth={availableWidth} title='Cadre' content={application.cadre_desc} />
				<InternshipItem availableWidth={availableWidth} title='Status' content={application.application_status} />

				<InternshipItem
					availableWidth={availableWidth}
					title='Date'
					content={dayjs(new Date(application.application_date)).format('YYYY-MM-DD')}
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

const RegistrationApplicationsComponent: FC<{
	applications: RegistrationApplication[];
	refetch: () => void;
	isRefetching: boolean;
}> = ({applications, refetch, isRefetching}) => {
	const [item, setItem] = useAtom(registrationAtom);

	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	const snapPoints = useMemo(() => ['25%', '50%'], []);

	const handlePresentModal = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	const handleItem = (item: RegistrationApplication) => {
		setItem(item);
		handlePresentModal();
	};

	const handleSheetChanges = useCallback((index: number) => {
		console.log('handle sheet changes', index);
	}, []);
	return (
		<GestureHandlerRootView style={{flex: 1}}>
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
						data={applications}
						renderItem={({item}) => (
							<AccordionShared title={<Title item={item} />}>
								<Application application={item} action={() => handleItem(item)} />
							</AccordionShared>
						)}
						keyExtractor={(_, index) => String(index)}
						ListEmptyComponent={<EmptyList message='Could not find any registration applications in your account' />}
						estimatedItemSize={150}
						onRefresh={refetch}
						refreshing={isRefetching}
					/>
				</View>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	);
};

export default RegistrationApplicationsComponent;

const Title: FC<{item: RegistrationApplication}> = ({item}) => {
	return (
		<View className='flex flex-col justify-between gap-2'>
			<View className='w-full overflow-auto'>
				<Text className='tracking-wide capitalize'>{item.cadre_desc}</Text>
			</View>
			<View className='w-full'>
				<Text className='italic font-extralight'>{dayjs(new Date(item.application_date)).format('ddd DD MMM YYYY')}</Text>
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
});
