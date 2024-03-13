import dayjs from 'dayjs';
import React, {FC, useCallback, useMemo, useRef, useState} from 'react';
import {FlatList, Pressable, StyleSheet, View, useWindowDimensions} from 'react-native';
import {currencyFormatter} from '../../helpers/currency-formatter';
import {LicenceApplication} from '../../models/licenceapplications';
import {useLicenceFetched} from '../../providers/licenceprovider';
import globalStyles from '../../styles/global';
import {InternshipItem, InternshipItemDouble} from '../internship/history/applications';
import EmptyList from '../shared/EmptyList';
// import ActionBottomLicence from './actionbottomlicence';
import {BottomSheetModal, BottomSheetModalProvider, BottomSheetView} from '@gorhom/bottom-sheet';
import PayForApplication from './actions/pay';
import DownloadInvoice from './actions/downloadinvoice';
import DownloadReceipt from './actions/downloadreceipt';
import {useAtom} from 'jotai';
import {licenceApplicationAtom} from '../../atoms/licence';

const Application: FC<{
	application: LicenceApplication;
	action: (application: LicenceApplication) => void;
}> = ({application, action}) => {
	const {height, width} = useWindowDimensions();

	const dimension = Math.min(width, height);

	const availableWidth = dimension - 20;
	return (
		<Pressable style={[styles.card]} onPress={() => action(application)}>
			<View style={[globalStyles.column]}>
				<InternshipItem availableWidth={availableWidth} title='County' content={application.County} />
				<InternshipItem availableWidth={availableWidth} title='Station' content={application.workstation_name} />

				<InternshipItem availableWidth={availableWidth} title='Employer' content={application.employer} />

				<InternshipItem
					availableWidth={availableWidth}
					title='Date'
					content={dayjs(new Date(application.renewal_date)).format('DD/MM/YYYY')}
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

	return (
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
				<FlatList
					data={applications}
					renderItem={({item}) => <Application application={item} action={() => handleItem(item)} />}
					onRefresh={refetch}
					refreshing={isRefetching}
					keyExtractor={(_, index) => String(index)}
					ListEmptyComponent={<EmptyList message='Could not find any licence applications in your account' />}
				/>
			</View>
		</BottomSheetModalProvider>
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
});
