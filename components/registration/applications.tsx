import {FlashList} from '@shopify/flash-list';
import dayjs from 'dayjs';
import {useRouter} from 'expo-router';
import {useAtom} from 'jotai';
import React, {FC, useMemo} from 'react';
import {View} from 'react-native';
import {internshipPayAtom} from '../../atoms/internship';
import {currencyFormatter} from '../../helpers/currency-formatter';
import {Pay} from '../../models/pay';
import {RegistrationApplication} from '../../models/regapplications';
import globalStyles from '../../styles/global';
import {InternshipItem, InternshipItemDouble} from '../internship/history/applications';
import AccordionShared from '../shared/Accordion';
import EmptyList from '../shared/EmptyList';
import PayButton from '../shared/PayButton';
import {Text} from '../Themed';

const Application: FC<{
	application: RegistrationApplication;
}> = ({application}) => {
	const [_, setPay] = useAtom(internshipPayAtom);

	const router = useRouter();

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
			<InternshipItem title='Cadre' content={application.cadre_desc} />
			<InternshipItem title='Status' content={application.application_status} />

			<InternshipItem title='Date' content={dayjs(new Date(application.application_date)).format('YYYY-MM-DD')} />

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
			<View>{+application?.invoice_details?.balance_due > 0 && <PayButton handlePay={handlePay} />}</View>
		</View>
	);
};

const RegistrationApplicationsComponent: FC<{
	applications: RegistrationApplication[];
	refetch: () => void;
	isRefetching: boolean;
}> = ({applications, refetch, isRefetching}) => {
	const sortedApplications = useMemo(
		() => applications.sort((a, b) => new Date(b.application_date).getTime() - new Date(a.application_date).getTime()),
		[applications]
	);

	const latestApplication = sortedApplications[0];

	if (!latestApplication) {
		return <EmptyList message='Could not find any registration applications in your account' />;
	}

	return (
		<View style={globalStyles.container}>
			<FlashList
				data={sortedApplications}
				renderItem={({item}) => (
					<AccordionShared title={<Title item={item} />}>
						<Application application={item} />
					</AccordionShared>
				)}
				keyExtractor={(_, index) => String(index)}
				ListEmptyComponent={<EmptyList message='Could not find any registration applications in your account' />}
				estimatedItemSize={150}
				onRefresh={refetch}
				refreshing={isRefetching}
			/>
		</View>
	);
};

export default RegistrationApplicationsComponent;

const Title: FC<{item: RegistrationApplication}> = ({item}) => {
	return (
		<View className='flex flex-col justify-between gap-2'>
			<View className='w-full overflow-auto'>
				<Text className='text-xl'>{item.cadre_desc}</Text>
			</View>
			<View className='w-full'>
				<Text italic>{dayjs(new Date(item.application_date)).format('ddd DD MMM YYYY')}</Text>
			</View>
		</View>
	);
};
