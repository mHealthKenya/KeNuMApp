import {Image} from 'expo-image';
import {useRouter} from 'expo-router';
import React, {FC} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useBottomSheetModal} from '@gorhom/bottom-sheet';
import {LicenceApplication} from '../../../models/licenceapplications';
import {useAtom} from 'jotai';
import {licenceApplicationAtom} from '../../../atoms/licence';
import globalStyles from '../../../styles/global';
import {PracticeApplication} from '../../../models/privatepractice';
import {privatePractice} from '../../../atoms/privatepractice';

const PayForApplication: FC<{
	item: PracticeApplication | null;
}> = ({item}) => {
	const router = useRouter();
	const {dismiss} = useBottomSheetModal();

	const [_, handleApplication] = useAtom(privatePractice);
	const handlePay = async (item: PracticeApplication | null) => {
		await handleApplication(item!);
		await dismiss();
		router.push('/paypractice');
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
				<Text style={styles.text}>Pay For Licence</Text>
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
