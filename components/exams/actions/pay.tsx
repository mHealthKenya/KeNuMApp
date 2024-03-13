import {Image} from 'expo-image';
import {useRouter} from 'expo-router';
import React, {FC} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useBottomSheetModal} from '@gorhom/bottom-sheet';
import {LicenceApplication} from '../../../models/licenceapplications';
import {useAtom} from 'jotai';
import {licenceApplicationAtom} from '../../../atoms/licence';
import globalStyles from '../../../styles/global';
import {ExamApplication} from '../../../models/examapplications';
import {examAtom} from '../../../atoms/exam';

const PayForApplication: FC<{
	item: ExamApplication | null;
}> = ({item}) => {
	const router = useRouter();
	const {dismiss} = useBottomSheetModal();

	const [_, handleApplication] = useAtom(examAtom);
	const handlePay = async (item: ExamApplication | null) => {
		await handleApplication(item!);
		await dismiss();
		router.push('/payexamhist');
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
				<Text style={styles.text}>Pay For Exam</Text>
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
