import {useAtom} from 'jotai';
import React from 'react';
import {privatePractice} from '../../atoms/privatepractice';
import PayComponent from '../../components/payments/pay';
import {Transactions} from '../../enums/transactions';

const PayPrivate = () => {
	const [data, _] = useAtom(privatePractice);

	return (
		<PayComponent
			pay={{
				title: 'Pay licence',
				acc_no: data ? data?.invoice_details?.invoice_number : '',
				amount: data ? +data?.invoice_details?.amount_due : 0,
				subtitle: `Private Practice Renewal: ${data?.workstation_name}`,
				transaction: Transactions.PrivatePractice,
				redirectPath: '/privateapplications',
			}}
		/>
	);
};

export default PayPrivate;
