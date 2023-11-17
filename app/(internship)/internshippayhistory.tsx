import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import PayComponent from '../../components/payments/pay';
import { Transactions } from '../../enums/transactions';

const InternshipPayHistory = () => {
	const { acc_no, amount, subtitle } = useLocalSearchParams();

	return (
		<PayComponent
			pay={{
				title: 'Pay for Internship',
				acc_no: '' + acc_no,
				amount: +amount,
				subtitle: 'Internship At ' + subtitle,
				transaction: Transactions.Internship,
				redirectPath: '/internshiphistory',
			}}
		/>
	);
};

export default InternshipPayHistory;
