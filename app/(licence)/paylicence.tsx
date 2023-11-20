import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import PayComponent from '../../components/payments/pay';
import { primaryColor } from '../../constants/Colors';
import { Transactions } from '../../enums/transactions';
import useRegistrationApplications from '../../services/registration/applications';
import globalStyles from '../../styles/global';
import useLicenceApplications from '../../services/licence/applications';
import { useAuth } from '../../providers/auth';

const PayLicence = () => {
	const { user } = useAuth();
	const { data, isLoading } = useLicenceApplications(user?.id || '');

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
				title: 'Pay for licence',
				acc_no: data ? data[0].invoice_no : '',
				amount: data ? +data[0].amount_due : 0,
				subtitle: 'Licence Renewal',
				transaction: Transactions.Licence,
				redirectPath: '/licenceapplications',
			}}
		/>
	);
};

export default PayLicence;
