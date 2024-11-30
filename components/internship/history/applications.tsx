import {BottomSheetModal, BottomSheetModalProvider, BottomSheetView} from '@gorhom/bottom-sheet';
import {FlashList} from '@shopify/flash-list';
import dayjs from 'dayjs';
import React, {FC, useCallback, useMemo, useRef, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Divider, Searchbar} from 'react-native-paper';
import {InternshipApplication} from '../../../models/internshipapplications';
import {useInternshipFetched} from '../../../providers/internship';
import {useSearch} from '../../../providers/search';
import globalStyles from '../../../styles/global';
import AccordionShared from '../../shared/Accordion';
import EmptyList from '../../shared/EmptyList';
import {Text} from '../../Themed';
import DownloadInvoice from './actions/downloadinvoice';
import DownloadReceipt from './actions/downloadreceipt';
import PayForApplication from './actions/pay';

export const currencyFormatter = new Intl.NumberFormat('en-KE', {
	style: 'currency',
	currency: 'KES',
});

export const InternshipItem: FC<{
	title: string;
	content: string;
}> = ({title, content}) => {
	return (
		<View>
			<View className='flex flex-1 flex-row gap-2 justify-between w-full'>
				<View className='flex flex-row justify-between gap-2 w-[35%]'>
					<View style={{justifyContent: 'center'}}>
						<Text className='text-[#0445b5] text-base'>{title}</Text>
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
					<Text className='text-base'>{content}</Text>
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
}> = ({title, content, subtitle, subtitle1, content1}) => {
	return (
		<View>
			<View className='flex flex-row gap-2 w-full'>
				<View className='flex flex-row gap-2 w-[35%] justify-between'>
					<View style={{justifyContent: 'center'}}>
						<Text className='text-[#0445b5] text-base'>{title}</Text>
					</View>

					<Divider
						style={{
							width: 1,
							height: '100%',
						}}
					/>
				</View>
				<View className='flex flex-1 flex-row justify-between w-full p-2'>
					<View className='flex flex-col gap-2 w-[33%]'>
						<View>
							<Text className="text-['#b6b6b6']">{subtitle}</Text>
						</View>
						<View>
							<Text className='text-base'>{content}</Text>
						</View>
					</View>

					<View className='flex flex-col gap-2 w-[33%]'>
						<View>
							<Text className="text-['#b6b6b6']">{subtitle1}</Text>
						</View>
						<View>
							<Text className='text-base'>{content1}</Text>
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
	return (
		<Pressable onPress={() => action(application)}>
			<View style={[globalStyles.column]}>
				<InternshipItem title='Center' content={application.internship_center} />
				<InternshipItem title='Cadre' content={application.cadre_desc} />
				<InternshipItemDouble
					title='Date'
					subtitle='Start Date'
					content={dayjs(new Date(application.start_date)).format('DD/MM/YYYY')}
					subtitle1='Application Date'
					content1={dayjs(new Date(application.application_date)).format('DD/MM/YYYY')}
				/>

				<InternshipItemDouble
					title='Invoice'
					subtitle='Invoice'
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

	const sortedApplications = useMemo(
		() => applications.sort((a, b) => new Date(b.application_date).getTime() - new Date(a.application_date).getTime()),
		[applications]
	);

	const filtered = useMemo(
		() => sortedApplications.filter((item) => item.internship_center.toLowerCase().includes(search.toLowerCase())),
		[sortedApplications, search]
	);

	const latestApplication = sortedApplications[0];

	if (!latestApplication) {
		return <EmptyList message='Could not find any internship applications in your account' />;
	}

	const latestApplicationId = latestApplication?.internship_id;

	return (
		<GestureHandlerRootView style={{flex: 1}}>
			<BottomSheetModalProvider>
				<View style={[globalStyles.container]}>
					<BottomSheetModal ref={bottomSheetModalRef} index={1} snapPoints={snapPoints} onChange={handleSheetChanges}>
						<View style={styles.bottomSheet}>
							{item?.internship_id === latestApplicationId && (
								<BottomSheetView style={[styles.contentContainer]}>
									<PayForApplication item={item} />
								</BottomSheetView>
							)}

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
						renderItem={({item}) => (
							<AccordionShared title={<Title item={item} />}>
								<Application application={item} action={() => handleItem(item)} />
							</AccordionShared>
						)}
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

const Title: FC<{item: InternshipApplication}> = ({item}) => {
	return (
		<View className='flex flex-col justify-between gap-2'>
			<View className='w-full overflow-auto'>
				<Text className='tracking-wide'>{item.internship_center}</Text>
			</View>
			<View className='w-full'>
				<Text className='italic font-extralight'>{dayjs(new Date(item.application_date)).format('ddd DD MMM YYYY')}</Text>
			</View>
		</View>
	);
};

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
