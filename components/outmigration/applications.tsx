import {FlashList} from '@shopify/flash-list';
import dayjs from 'dayjs';
import {useRouter} from 'expo-router';
import {useAtom} from 'jotai';
import React, {FC, useMemo, useState} from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import {Divider, List, Searchbar} from 'react-native-paper';
import {internshipPayAtom} from '../../atoms/internship';
import {currencyFormatter} from '../../helpers/currency-formatter';
import {OutmigrationApplication} from '../../models/outmigrations';
import {Pay} from '../../models/pay';
import {useSearch} from '../../providers/search';
import globalStyles from '../../styles/global';
import {InternshipItem, InternshipItemDouble} from '../internship/history/applications';
import AccordionShared from '../shared/Accordion';
import EmptyList from '../shared/EmptyList';
import PayButton from '../shared/PayButton';
import {Text} from '../Themed';

const extractor = (t: string) => {
	let name = '';
	const items = t.split(' ');

	for (const i of items) {
		name += i
			.charAt(0)
			.replace(/[^a-zA-Z0-9]/g, '')
			.toUpperCase();
	}

	return name;
};

export const CustomDrop: FC<{
	application: OutmigrationApplication;
}> = ({application}) => {
	const {width, height} = useWindowDimensions();
	const dimension = Math.min(width, height);

	const availableWidth = dimension - 20;

	const items = useMemo(() => application.verification_cadres.split(','), [application]);

	const [show, setShow] = useState(false);

	const [item, setItem] = useState('');

	const fItems = useMemo(
		() =>
			items.map((item) => ({
				item,
				short: extractor(item),
			})),
		[items]
	);

	const handlePress = (item: string) => {
		setShow(!show);
		setItem(item);
	};

	return (
		<View>
			<View className='flex flex-row justify-between p-2'>
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
						<Text style={[styles.itemText, styles.titleText]}>Cadre</Text>
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
						},
					]}>
					{fItems.map((val, index) => (
						<List.Accordion
							title={val.short}
							expanded={val.item === item && show}
							onPress={() => handlePress(val.item)}
							key={index}>
							<List.Item
								title={
									<View style={{flex: 1}}>
										<Text>{val.item}</Text>
									</View>
								}
							/>
						</List.Accordion>
					))}
				</View>
			</View>
		</View>
	);
};

const Application: FC<{
	application: OutmigrationApplication;
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
			<InternshipItem title='Country' content={application.country_name} />

			<InternshipItem title='Work Station' content={application.application_status} />

			<InternshipItem title='Date' content={dayjs(new Date(application.application_date)).format('DD/MM/YYYY')} />

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
			<View>{+application.invoice_details.balance_due > 0 && <PayButton handlePay={handlePay} />}</View>
		</View>
	);
};

const OutmigrationApplicationsComponent: FC<{
	applications: OutmigrationApplication[];
	refetch: () => void;
	isRefetching: boolean;
}> = ({applications, refetch, isRefetching}) => {
	const {search, handleSearch} = useSearch();

	const sortedApplications = useMemo(
		() => applications.sort((a, b) => new Date(b.application_date).getTime() - new Date(a.application_date).getTime()),
		[applications]
	);

	const items = useMemo(
		() => sortedApplications.filter((item) => item.country_name.toLowerCase().includes(search.toLowerCase())),
		[search, sortedApplications]
	);

	return (
		<View style={{flex: 1}}>
			<Searchbar
				placeholder='Search by country name'
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
					ListEmptyComponent={<EmptyList message='Could not find any private practice applications in your account' />}
				/>
			</View>
		</View>
	);
};

export default OutmigrationApplicationsComponent;

const Title: FC<{item: OutmigrationApplication}> = ({item}) => {
	return (
		<View className='flex flex-col gap-1'>
			<View className='w-full'>
				<Text className='truncate text-xl'>{item.country_name}</Text>
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

	itemText: {
		textAlign: 'left',
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

	normalText: {
		letterSpacing: 1.5,
		textTransform: 'capitalize',
		fontSize: 16,
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
