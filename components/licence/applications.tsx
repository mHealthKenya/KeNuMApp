import dayjs from 'dayjs';
import React, {FC, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {currencyFormatter} from '../../helpers/currency-formatter';
import {LicenceApplication} from '../../models/licenceapplications';
import globalStyles from '../../styles/global';
import {InternshipItem, InternshipItemDouble} from '../internship/history/applications';
import EmptyList from '../shared/EmptyList';
// import ActionBottomLicence from './actionbottomlicence';
import {FlashList} from '@shopify/flash-list';
import {useRouter} from 'expo-router';
import {useAtom} from 'jotai';
import {Searchbar} from 'react-native-paper';
import {internshipPayAtom} from '../../atoms/internship';
import {DateFormat} from '../../enums/date';
import {Pay} from '../../models/pay';
import {useSearch} from '../../providers/search';
import AccordionShared from '../shared/Accordion';
import PayButton from '../shared/PayButton';
import {Text} from '../Themed';

const Application: FC<{
	application: LicenceApplication;
}> = ({application}) => {
	const [_, setPay] = useAtom(internshipPayAtom);
	const router = useRouter();
	const handlePay = async () => {
		const data: Pay = {
			secureHash: application?.invoice_details.secureHash || '',
			apiClientID: application?.invoice_details.apiClientID || '',
			serviceID: parseInt(application?.invoice_details.serviceID || '0'),
			notificationURL: application?.invoice_details.notificationURL || '',
			pictureURL: application?.invoice_details.pictureURL || '',
			callBackURLOnSuccess: application?.invoice_details.callBackURLOnSuccess || '',
			billRefNumber: application?.invoice_details.billRefNumber || '',
			currency: application?.invoice_details.currency || '',
			amountExpected: parseInt(application?.invoice_details.amountExpected || '0'),
			billDesc: application?.invoice_details.billDesc || '',
			clientMSISDN: application?.invoice_details.clientMSISDN || '',
			clientIDNumber: application?.invoice_details.clientIDNumber || '',
			clientEmail: application?.invoice_details.clientEmail || '',
			clientName: application?.invoice_details.clientName || '',
		};

		await setPay(data);
		router.push('/ecitizen');
	};

	return (
		<View style={[globalStyles.column]}>
			{application?.workstation_name !== 'DIASPORA' && <InternshipItem title='County' content={application.County} />}
			<InternshipItem title='Station' content={application.workstation_name} />

			{application?.workstation_name !== 'DIASPORA' && <InternshipItem title='Employer' content={application.employer} />}

			<InternshipItem title='Date' content={dayjs(new Date(application.renewal_date)).format(DateFormat.WITH_DAY)} />

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
			{+application.invoice_details.balance_due > 0 && <PayButton handlePay={handlePay} />}
		</View>
	);
};

const LicenceApplicationsComponent: FC<{
	applications: LicenceApplication[];
	refetch: () => void;
	isRefetching: boolean;
}> = ({applications, refetch, isRefetching}) => {
	const {search, handleSearch} = useSearch();

	const sortedApplications = applications.sort((a, b) => {
		return new Date(b.renewal_date).getTime() - new Date(a.renewal_date).getTime();
	});

	const items = useMemo(
		() =>
			sortedApplications.filter(
				(item) =>
					item.workstation_name.toLowerCase().includes(search.toLowerCase()) ||
					item.employer.toLowerCase().includes(search.toLowerCase()) ||
					dayjs(new Date(item.renewal_date)).format(DateFormat.WITH_DAY).toLowerCase().includes(search.toLowerCase())
			),
		[search, sortedApplications]
	);

	return (
		<View style={{flex: 1}}>
			<Searchbar
				placeholder='Search by workstation employer or date'
				onChangeText={handleSearch}
				value={search}
				style={styles.searchBar}
			/>

			<View style={globalStyles.container}>
				<FlashList
					data={items}
					renderItem={({item}) => (
						<AccordionShared title={<Title item={item} />}>
							<Application application={item} />
						</AccordionShared>
					)}
					onRefresh={refetch}
					refreshing={isRefetching}
					keyExtractor={(_, index) => String(index)}
					estimatedItemSize={150}
					ListEmptyComponent={<EmptyList message='Could not find any licence applications in your account' />}
				/>
			</View>
		</View>
	);
};

const Title: FC<{item: LicenceApplication}> = ({item}) => {
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
