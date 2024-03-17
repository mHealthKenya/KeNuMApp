import {useBottomSheetModal} from '@gorhom/bottom-sheet';
import {Image} from 'expo-image';
import {useRouter} from 'expo-router';
import {useAtom} from 'jotai';
import React, {FC} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {outmigrationGenAtom} from '../../../atoms/outmigration';
import {OutmigrationApplication} from '../../../models/outmigrations';
import globalStyles from '../../../styles/global';

const PayForApplication: FC<{
	item: OutmigrationApplication | null;
}> = ({item}) => {
	const router = useRouter();
	const {dismiss} = useBottomSheetModal();

	const [_, handleApplication] = useAtom(outmigrationGenAtom);
	const handlePay = async (item: OutmigrationApplication | null) => {
		await handleApplication(item!);
		await dismiss();
		router.push('/payoutmigrationhist');
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
