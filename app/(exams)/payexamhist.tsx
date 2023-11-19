import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import PayComponent from '../../components/payments/pay';
import { Transactions } from '../../enums/transactions';

const PayExamHist = () => {
	const { acc_no, amount, subtitle } = useLocalSearchParams();

	return (
		<PayComponent
			pay={{
				title: 'Pay for Exam',
				acc_no: '' + acc_no,
				amount: +amount,
				subtitle: 'Exam series ' + subtitle,
				transaction: Transactions.Exam,
				redirectPath: '/examapplications',
			}}
		/>
	);
};

export default PayExamHist;
