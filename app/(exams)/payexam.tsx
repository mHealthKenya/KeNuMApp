import React from 'react';
import PayComponent from '../../components/payments/pay';
import CenterLoad from '../../components/shared/CenterLoad';
import { Transactions } from '../../enums/transactions';
import useAuthenticatedUser from '../../services/auth/authenticated';
import useExamApplications from '../../services/exams/applications';

const PayExam = () => {
	const {data: user, isLoading: loadingUser} = useAuthenticatedUser();
	const {data, isLoading} = useExamApplications(user?.IndexNo || '');

	if (isLoading || loadingUser) {
		return <CenterLoad />;
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
