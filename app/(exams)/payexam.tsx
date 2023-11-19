import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import PayComponent from '../../components/payments/pay';
import { primaryColor } from '../../constants/Colors';
import { Transactions } from '../../enums/transactions';
import useInternshipApplications from '../../services/internship/applications';
import globalStyles from '../../styles/global';
import useExamApplications from '../../services/exams/applications';
import { useAuth } from '../../providers/auth';

const PayExam = () => {
	const { user } = useAuth();
	const { data, isLoading } = useExamApplications(user?.id || '');

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
				title: 'Pay for Exam',
				acc_no: data ? data[0].invoice_no : '',
				amount: data ? +data[0].amount_due : 0,
				subtitle: data ? 'Exam Series ' + data[0].exams_series : '',
				transaction: Transactions.Internship,
				redirectPath: '/examapplications',
			}}
		/>
	);
};

export default PayExam;
