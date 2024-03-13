import {useLocalSearchParams} from 'expo-router';
import React from 'react';
import PayComponent from '../../components/payments/pay';
import {Transactions} from '../../enums/transactions';
import {useAtom} from 'jotai';
import {examAtom} from '../../atoms/exam';

const PayExamHist = () => {
	const [exam, _] = useAtom(examAtom);

	return (
		<PayComponent
			pay={{
				title: 'Pay for Exam',
				acc_no: '' + exam?.invoice_no,
				amount: exam ? +exam?.amount_due : 0,
				subtitle: 'Exam series ' + exam?.exams_series,
				transaction: Transactions.Exam,
				redirectPath: '/examapplications',
			}}
		/>
	);
};

export default PayExamHist;
