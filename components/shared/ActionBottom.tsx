import {
	Actionsheet,
	ActionsheetBackdrop,
	ActionsheetContent,
	ActionsheetDragIndicator,
	ActionsheetDragIndicatorWrapper,
	ActionsheetItem,
} from '@gluestack-ui/themed';
import { Image } from 'expo-image';
import * as Print from 'expo-print';
import { useRouter } from 'expo-router';
import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
	InternshipMode,
	internShipReceiptGen,
} from '../../helpers/receiptgenerator';
import { InternshipApplication } from '../../models/internshipapplications';
import { useAuth } from '../../providers/auth';
import globalStyles from '../../styles/global';

interface Action {
	show: boolean;
	toggleShow: () => void;
	item: InternshipApplication | null;
}

const ActionBottom: FC<{ action: Action }> = ({
	action: { show, toggleShow, item },
}) => {
	const { user } = useAuth();

	// const [selectedPrinter, setSelectedPrinter] = useState<Print.Printer>();

	const print = async () => {
		await Print.printAsync({
			html: internShipReceiptGen(item!, user),
			// printerUrl: selectedPrinter?.url,
		});
		toggleShow();
	};

	const printReceipt = async () => {
		await Print.printAsync({
			html: internShipReceiptGen(item!, user, InternshipMode.paid),
			// printerUrl: selectedPrinter?.url,
		});
		toggleShow();
	};

	// const printToFile = async () => {
	// 	const { uri } = await Print.printToFileAsync({ html: htmlContent });
	// 	console.log('File has been saved to:', uri);
	// 	await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
	// };

	// const selectPrinter = async () => {
	// 	const printer = await Print.selectPrinterAsync(); // iOS only
	// 	setSelectedPrinter(printer);
	// };

	const router = useRouter();
	const handlePay = (item: InternshipApplication | null) => {
		toggleShow();

		console.log(item);
		router.push({
			pathname: '/internshippayhistory',
			params: {
				acc_no: item?.invoice_no || '',
				amount: item?.balance_due || '',
				subtitle: item?.internship_center || '',
			},
		});
	};

	return (
		<Actionsheet isOpen={show} onClose={toggleShow} zIndex={999}>
			<ActionsheetBackdrop />
			<ActionsheetContent h='$72' zIndex={999}>
				<ActionsheetDragIndicatorWrapper>
					<ActionsheetDragIndicator />
				</ActionsheetDragIndicatorWrapper>
				<ActionsheetItem onPress={() => handlePay(item)}>
					<View
						style={[
							globalStyles.row,
							{
								justifyContent: 'center',
								height: 50,
							},
						]}>
						<View style={{ justifyContent: 'center' }}>
							<Image
								source={require('../../assets/images/pay.png')}
								style={{
									width: 40,
									height: 40,
									marginRight: 15,
									borderRadius: 20,
								}}
							/>
						</View>

						<View style={{ justifyContent: 'center' }}>
							<Text style={styles.text}>Pay For Internship</Text>
						</View>
					</View>
				</ActionsheetItem>
				<ActionsheetItem onPress={print}>
					<View
						style={[
							globalStyles.row,
							{
								justifyContent: 'center',
								height: 50,
							},
						]}>
						<View style={{ justifyContent: 'center' }}>
							<Image
								source={require('../../assets/images/downloadinvoice.png')}
								style={{
									width: 40,
									height: 40,
									marginRight: 15,
									borderRadius: 20,
								}}
							/>
						</View>

						<View style={{ justifyContent: 'center' }}>
							<Text style={styles.text}>Download Invoice</Text>
						</View>
					</View>
				</ActionsheetItem>
				<ActionsheetItem onPress={printReceipt}>
					<View
						style={[
							globalStyles.row,
							{
								justifyContent: 'center',
								height: 50,
							},
						]}>
						<View style={{ justifyContent: 'center' }}>
							<Image
								source={require('../../assets/images/downloadreceipt.png')}
								style={{
									width: 40,
									height: 40,
									marginRight: 15,
									borderRadius: 20,
								}}
							/>
						</View>

						<View style={{ justifyContent: 'center' }}>
							<Text style={styles.text}>Download Receipt</Text>
						</View>
					</View>
				</ActionsheetItem>
			</ActionsheetContent>
		</Actionsheet>
	);
};

export default ActionBottom;

const styles = StyleSheet.create({
	text: {
		letterSpacing: 2,
		fontSize: 18,
	},
});
