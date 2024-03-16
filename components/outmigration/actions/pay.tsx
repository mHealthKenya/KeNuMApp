import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { FC } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useBottomSheetModal } from '@gorhom/bottom-sheet';
import { OutmigrationApplicationHistory } from '../../../models/outmigrationapplicationhistory';
import globalStyles from '../../../styles/global';
import { useAuth } from '../../../providers/auth';
import useOutMigrationHistorys from '../../../services/outmigration/outmigrationapplicationhistory';
import { useOutMigrationFetched } from '../../../providers/outmigrationprovider';

const PayForApplication: FC<{
	item: OutmigrationApplicationHistory | null;
}> = ({ item }) => {
	const router = useRouter();
	const { dismiss } = useBottomSheetModal();
	
	const { user } = useAuth();

	const { handleMigrate } = useOutMigrationFetched();

	const handlePay = async (item: OutmigrationApplicationHistory | null) => {
		await handleMigrate(item!);
		await dismiss();
		router.push('/outmigrationhome');
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
					source={require('../../../assets/images/pay.png')}
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
