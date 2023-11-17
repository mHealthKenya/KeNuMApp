import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import PayComponent from '../../components/payments/pay';
import { primaryColor } from '../../constants/Colors';
import { Transactions } from '../../enums/transactions';
import useInternshipApplications from '../../services/internship/applications';
import globalStyles from '../../styles/global';

const InternshipPay = () => {
	const { data, isLoading } = useInternshipApplications();

	if (isLoading) {
		return (
			<View style={[globalStyles.container, globalStyles.center]}>
				<ActivityIndicator size='large' color={primaryColor} />
			</View>
		);
	}

	return (
		<PayComponent
			pay={{
				title: 'Pay for Internship',
				acc_no: data ? data[0].invoice_no : '',
				amount: data ? +data[0].amount_due : 0,
				subtitle: data ? 'Internship At ' + data[0].internship_center : '',
				transaction: Transactions.Internship,
				redirectPath: '/internshiphistory',
			}}
		/>
	);
};

export default InternshipPay;
