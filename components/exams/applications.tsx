import {FlashList} from '@shopify/flash-list';
import dayjs from 'dayjs';
import {useRouter} from 'expo-router';
import {useAtom} from 'jotai';
import React, {FC, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {internshipPayAtom} from '../../atoms/internship';
import {currencyFormatter} from '../../helpers/currency-formatter';
import {ExamApplication} from '../../models/examapplications';
import {Pay} from '../../models/pay';
import {useSearch} from '../../providers/search';
import globalStyles from '../../styles/global';
import {InternshipItem, InternshipItemDouble} from '../internship/history/applications';
import AccordionShared from '../shared/Accordion';
import EmptyList from '../shared/EmptyList';
import PayButton from '../shared/PayButton';
import {Text} from '../Themed';

const Application: FC<{
	application: ExamApplication;
}> = ({application}) => {
	const router = useRouter();

	const [_, setPay] = useAtom(internshipPayAtom);

	const handlePay = async () => {
		const data: Pay = {
			secureHash: application.invoice_details.secureHash || '',
			apiClientID: application.invoice_details.apiClientID || '',
			serviceID: parseInt(application.invoice_details.serviceID || '0'),
			notificationURL: application.invoice_details.notificationURL || '',
			pictureURL: application.invoice_details.pictureURL || '',
			callBackURLOnSuccess: application.invoice_details.callBackURLOnSuccess || '',
			billRefNumber: application.invoice_details.billRefNumber || '',
			currency: application.invoice_details.currency || '',
			amountExpected: parseInt(application.invoice_details.amountExpected || '0'),
			billDesc: application.invoice_details.billDesc || '',
			clientMSISDN: application.invoice_details.clientMSISDN || '',
			clientIDNumber: application.invoice_details.clientIDNumber || '',
			clientEmail: application.invoice_details.clientEmail || '',
			clientName: application.invoice_details.clientName || '',
		};

		await setPay(data);
		router.push('/ecitizen');
	};

	return (
		<View style={[globalStyles.column]}>
			<InternshipItem title='Exam Series' content={application.exams_series} />
			<InternshipItem title='Cadre' content={application.cadre} />

			<InternshipItem title='Date' content={dayjs(new Date(application.application_date)).format('YYYY-MM-DD')} />

			<InternshipItemDouble
				title='Invoice'
				subtitle='Invoice Number'
				content={application?.invoice_details?.invoice_number}
				subtitle1='Amount'
				content1={currencyFormatter.format(+application?.invoice_details?.amount_due)}
			/>

			<InternshipItemDouble
				title='Amount'
				subtitle='Amount Paid'
				content={currencyFormatter.format(+application?.invoice_details?.amount_paid)}
				subtitle1='Balance Due'
				content1={currencyFormatter.format(+application?.invoice_details.balance_due)}
			/>
			<View>{+application.invoice_details?.balance_due > 0 && <PayButton handlePay={handlePay} />}</View>
		</View>
	);
};

const ExamApplicationsComponent: FC<{
	applications: ExamApplication[];
	refetch: () => void;
	isRefetching: boolean;
}> = ({applications, refetch, isRefetching}) => {
	const {search, handleSearch} = useSearch();

	const items = useMemo(
		() =>
			applications.filter(
				(item) =>
					item.cadre.toLowerCase().includes(search.toLowerCase()) ||
					item.exams_series.toLowerCase().includes(search.toLowerCase())
			),
		[search, applications]
	);

	return (
		<View style={globalStyles.container}>
			<Searchbar placeholder='Search by cadre' onChangeText={handleSearch} value={search} style={styles.searchBar} />

			<FlashList
				data={items}
				renderItem={({item}) => (
					<AccordionShared title={<Title item={item} />}>
						<Application application={item} />
					</AccordionShared>
				)}
				keyExtractor={(_, index) => String(index)}
				onRefresh={refetch}
				refreshing={isRefetching}
				estimatedItemSize={150}
				ListEmptyComponent={<EmptyList message='Could not find any exam applications for your account' />}
			/>
		</View>
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
