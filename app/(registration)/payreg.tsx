import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import PayComponent from '../../components/payments/pay';
import { primaryColor } from '../../constants/Colors';
import { Transactions } from '../../enums/transactions';
import useRegistrationApplications from '../../services/registration/applications';
import globalStyles from '../../styles/global';

const PayReg = () => {
	const { data, isLoading } = useRegistrationApplications();

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
				title: 'Pay for registration',
				acc_no: data ? data[0].invoice_no : '',
				amount: data ? +data[0].amount_due : 0,
				subtitle: data ? 'Cadre ' + data[0].cadre : '',
				transaction: Transactions.Internship,
				redirectPath: '/registrationapplications',
			}}
		/>
	);
};

export default PayReg;
