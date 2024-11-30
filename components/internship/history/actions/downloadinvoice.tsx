import {useBottomSheetModal} from '@gorhom/bottom-sheet';
import {Image} from 'expo-image';
import {printToFileAsync} from 'expo-print';
import * as Sharing from 'expo-sharing';
import React, {FC} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {internShipReceiptGen} from '../../../../helpers/receiptgenerator';
import {InternshipApplication} from '../../../../models/internshipapplications';
import {useAuth} from '../../../../providers/auth';
import globalStyles from '../../../../styles/global';

const DownloadInvoice: FC<{item: InternshipApplication | null}> = ({item}) => {
	const {user} = useAuth();

	const print = async () => {
		const file = await printToFileAsync({
			html: internShipReceiptGen(item!, user),
			base64: false,
		});

		await Sharing.shareAsync(file.uri);
	};

	const {dismiss} = useBottomSheetModal();

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
					source={require('../../../../assets/images/downloadinvoice.png')}
					style={{
						width: 50,
						height: 50,
						marginRight: 15,
						borderRadius: 25,
					}}
				/>
			</View>

			<View style={{justifyContent: 'center'}}>
				<Text style={styles.text}>Download Invoice</Text>
			</View>
		</Pressable>
	);
};

export default DownloadInvoice;

const styles = StyleSheet.create({
	text: {
		letterSpacing: 2,
		fontSize: 18,
	},
});
