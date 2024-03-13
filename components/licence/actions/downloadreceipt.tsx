import {useBottomSheetModal} from '@gorhom/bottom-sheet';
import {Image} from 'expo-image';
import {printToFileAsync} from 'expo-print';
import {shareAsync} from 'expo-sharing';
import React, {FC} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {LicenceApplication} from '../../../models/licenceapplications';
import {useAuth} from '../../../providers/auth';
import {licenceReceiptGen} from '../../../helpers/receiptgeneratorlicence';
import globalStyles from '../../../styles/global';

const DownloadReceipt: FC<{item: LicenceApplication | null}> = ({item}) => {
	const {user} = useAuth();

	const {dismiss} = useBottomSheetModal();

	const print = async () => {
		const file = await printToFileAsync({
			html: licenceReceiptGen(item!, user),
			base64: false,
		});

		await shareAsync(file.uri);
	};

	const clickAction = () => {
		dismiss();
		print();
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
			onPress={clickAction}>
			<View style={{justifyContent: 'center'}}>
				<Image
					source={require('../../../assets/images/downloadreceipt.png')}
					style={{
						width: 50,
						height: 50,
						marginRight: 15,
						borderRadius: 25,
					}}
				/>
			</View>

			<View style={{justifyContent: 'center'}}>
				<Text style={styles.text}>Download Receipt</Text>
			</View>
		</Pressable>
	);
};

export default DownloadReceipt;

const styles = StyleSheet.create({
	text: {
		letterSpacing: 2,
		fontSize: 18,
	},
});
