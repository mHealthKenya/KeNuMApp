import {useBottomSheetModal} from '@gorhom/bottom-sheet';
import {Image} from 'expo-image';
import {useRouter} from 'expo-router';
import {useAtom} from 'jotai';
import React, {FC} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {internshipPayAtom} from '../../../atoms/internship';
import {OutmigrationApplication} from '../../../models/outmigrations';
import {Pay} from '../../../models/pay';
import globalStyles from '../../../styles/global';

const PayForApplication: FC<{
	item: OutmigrationApplication | null;
}> = ({item}) => {
	const router = useRouter();
	const {dismiss} = useBottomSheetModal();

	const [_, setPay] = useAtom(internshipPayAtom);

	const handlePay = async (item: OutmigrationApplication | null) => {
		const data: Pay = {
			secureHash: item?.invoice_details.secureHash || '',
			apiClientID: item?.invoice_details.apiClientID || '',
			serviceID: parseInt(item?.invoice_details.serviceID || '0'),
			notificationURL: item?.invoice_details.notificationURL || '',
			pictureURL: item?.invoice_details.pictureURL || '',
			callBackURLOnSuccess: item?.invoice_details.callBackURLOnSuccess || '',
			billRefNumber: item?.invoice_details.billRefNumber || '',
			currency: item?.invoice_details.currency || '',
			amountExpected: parseInt(item?.invoice_details.amountExpected || '0'),
			billDesc: item?.invoice_details.billDesc || '',
			clientMSISDN: item?.invoice_details.clientMSISDN || '',
			clientIDNumber: item?.invoice_details.clientIDNumber || '',
			clientEmail: item?.invoice_details.clientEmail || '',
			clientName: item?.invoice_details.clientName || '',
		};

		await setPay(data);
		await dismiss();
		router.push('/ecitizen');
	};

	return (
		<Pressable
			style={[
				globalStyles.row,
				{
					justifyContent: 'center',
					flex: 1,
					backgroundColor: '#dbe6f5',
					width: '100%',
					borderRadius: 5,
				},
			]}
			onPress={() => handlePay(item)}>
			<View style={{justifyContent: 'center'}}>
				<Image
					source={require('../../../assets/images/pay.png')}
					style={{
						width: 50,
						height: 50,
						marginRight: 15,
						borderRadius: 25,
					}}
				/>
			</View>

			<View style={{justifyContent: 'center'}}>
				<Text style={styles.text}>Pay For Outmigration</Text>
			</View>
		</Pressable>
	);
};

export default PayForApplication;

const styles = StyleSheet.create({
	text: {
		letterSpacing: 2,
		fontSize: 18,
	},
});
