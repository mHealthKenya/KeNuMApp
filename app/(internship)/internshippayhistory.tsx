import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import PayComponent from '../../components/payments/pay';
import { Transactions } from '../../enums/transactions';
import { useInternshipFetched } from '../../providers/internship';

const InternshipPayHistory = () => {
	const { application } = useInternshipFetched();
	const { acc_no, amount, subtitle } = useLocalSearchParams();

	return (
		<PayComponent
			pay={{
				title: 'Pay for Internship',
				acc_no: '' + application?.invoice_no,
				amount: +application?.balance_due!,
				subtitle: 'Internship At ' + application?.internship_center,
				transaction: Transactions.Internship,
				redirectPath: '/internshiphistory',
			}}
		/>
	);
};

export default InternshipPayHistory;
