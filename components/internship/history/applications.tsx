import {BottomSheetModal, BottomSheetModalProvider, BottomSheetView} from '@gorhom/bottom-sheet';
import {FlashList} from '@shopify/flash-list';
import dayjs from 'dayjs';
import React, {FC, useCallback, useMemo, useRef, useState} from 'react';
import {Pressable, StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import {Divider, Searchbar} from 'react-native-paper';
import {InternshipApplication} from '../../../models/internshipapplications';
import {useInternshipFetched} from '../../../providers/internship';
import {useSearch} from '../../../providers/search';
import globalStyles from '../../../styles/global';
import EmptyList from '../../shared/EmptyList';
import DownloadInvoice from './actions/downloadinvoice';
import DownloadReceipt from './actions/downloadreceipt';
import PayForApplication from './actions/pay';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export const currencyFormatter = new Intl.NumberFormat('en-KE', {
	style: 'currency',
	currency: 'KES',
});

export const InternshipItem: FC<{
	title: string;
	content: string;
	availableWidth: number;
}> = ({title, content, availableWidth}) => {
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
						<Text style={[styles.itemText, styles.titleText]}>{title}</Text>
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
					<Text style={styles.normalText}>{content}</Text>
				</View>
			</View>
		</View>
	);
};

export const InternshipItemDouble: FC<{
	title: string;
	subtitle: string;
	subtitle1: string;
	content: string;
	content1: string;
	availableWidth: number;
}> = ({title, content, availableWidth, subtitle, subtitle1, content1}) => {
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
						<Text style={[styles.itemText, styles.titleText]}>{title}</Text>
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
						globalStyles.row,
						{
							flex: 1,
							padding: 10,
							justifyContent: 'space-between',
						},
					]}>
					<View style={[globalStyles.column, {width: availableWidth * 0.31}]}>
						<View style={{paddingVertical: 3}}>
							<Text style={styles.mutedText}>{subtitle}</Text>
						</View>
						<View style={{paddingVertical: 3}}>
							<Text style={styles.normalText}>{content}</Text>
						</View>
					</View>

					<View style={[globalStyles.column, {width: availableWidth * 0.31}]}>
						<View style={{paddingVertical: 3}}>
							<Text style={styles.mutedText}>{subtitle1}</Text>
						</View>
						<View style={{paddingVertical: 3}}>
							<Text style={styles.normalText}>{content1}</Text>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
};

const Application: FC<{
	application: InternshipApplication;
	action: (item: InternshipApplication) => void;
}> = ({application, action}) => {
	const {height, width} = useWindowDimensions();

	const dimension = Math.min(width, height);

	const availableWidth = dimension - 20;
	return (
		<Pressable style={[styles.card]} onPress={() => action(application)}>
			<View style={[globalStyles.column]}>
				<InternshipItem availableWidth={availableWidth} title='Center' content={application.internship_center} />
				<InternshipItem availableWidth={availableWidth} title='Cadre' content={application.cadre_desc} />
				<InternshipItemDouble
					title='Date'
					subtitle='Start Date'
					content={dayjs(new Date(application.start_date)).format('DD/MM/YYYY')}
					subtitle1='Application Date'
					content1={dayjs(new Date(application.application_date)).format('DD/MM/YYYY')}
					availableWidth={availableWidth}
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

const InternshipApplicationsComponent: FC<{
	applications: InternshipApplication[];
	refresh: () => void;
	isRefreshing: boolean;
}> = ({applications, refresh, isRefreshing}) => {
	const {handleApplication} = useInternshipFetched();

	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	const snapPoints = useMemo(() => ['25%', '50%'], []);

	const handlePresentModal = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	const handleSheetChanges = useCallback((index: number) => {
		console.log('handle sheet changes', index);
	}, []);

	const {search, handleSearch} = useSearch();

	const [item, setItem] = useState<InternshipApplication | null>(null);

	const handleItem = (item: InternshipApplication) => {
		setItem(item);
		handleApplication(item);
		handlePresentModal();
	};

	const filtered = useMemo(
		() => applications.filter((item) => item.internship_center.toLowerCase().includes(search.toLowerCase())),
		[applications, search]
	);

	return (
		<GestureHandlerRootView style={{flex: 1}}>
			<BottomSheetModalProvider>
				<View style={[globalStyles.container]}>
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
					<Searchbar
						placeholder='Search by internship center'
						onChangeText={handleSearch}
						value={search}
						style={styles.searchBar}
					/>
					<FlashList
						data={filtered}
						renderItem={({item}) => <Application application={item} action={() => handleItem(item)} />}
						keyExtractor={(item) => item.internship_id}
						showsVerticalScrollIndicator={false}
						onRefresh={() => refresh()}
						refreshing={isRefreshing}
						estimatedItemSize={150}
						ListEmptyComponent={<EmptyList message='Could not find any internship applications in your account' />}
					/>
				</View>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	);
};

export default InternshipApplicationsComponent;

const styles = StyleSheet.create({
	box: {
		padding: 20,
		margin: 4,
	},

	card: {
		// backgroundColor: '#dcf0fa',
		backgroundColor: '#FFFF',
		borderRadius: 10,
		padding: 10,
		shadowColor: '#b1c4e5',
		shadowOffset: {
			width: 0,
			height: 10,
		},
		shadowOpacity: 0.9,
		shadowRadius: 6,
		elevation: 14,
		margin: 10,
	},

	itemText: {
		textAlign: 'left',
	},

	titleText: {
		fontSize: 14,
		color: '#356bc4',
		letterSpacing: 2,
	},

	normalText: {
		letterSpacing: 1.5,
		textTransform: 'capitalize',
		fontSize: 16,
	},

	mutedText: {
		color: '#b6b6b6',
		fontSize: 14,
	},

	searchBar: {
		backgroundColor: '#dbe6f5',
		margin: 5,
		padding: 2,
		borderRadius: 10,
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
