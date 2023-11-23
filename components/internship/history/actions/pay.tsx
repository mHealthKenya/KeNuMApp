import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { FC } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { InternshipApplication } from '../../../../models/internshipapplications';
import { useInternshipFetched } from '../../../../providers/internship';
import globalStyles from '../../../../styles/global';
import { useBottomSheetModal } from '@gorhom/bottom-sheet';

const PayForApplication: FC<{
	item: InternshipApplication | null;
}> = ({ item }) => {
	const router = useRouter();
	const { dismiss } = useBottomSheetModal();

	const { handleApplication } = useInternshipFetched();
	const handlePay = async (item: InternshipApplication | null) => {
		await handleApplication(item!);
		await dismiss();
		router.push('/internshippayhistory');
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
			<View style={{ justifyContent: 'center' }}>
				<Image
					source={require('../../../../assets/images/pay.png')}
					style={{
						width: 50,
						height: 50,
						marginRight: 15,
						borderRadius: 25,
					}}
				/>
			</View>

			<View style={{ justifyContent: 'center' }}>
				<Text style={styles.text}>Pay For Internship</Text>
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
