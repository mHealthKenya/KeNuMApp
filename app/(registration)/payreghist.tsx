import {useAtom} from 'jotai';
import React from 'react';
import {registrationAtom} from '../../atoms/registration';
import PayComponent from '../../components/payments/pay';
import {Transactions} from '../../enums/transactions';

const PayRegHist = () => {
	const [registration, _] = useAtom(registrationAtom);

	return (
		<PayComponent
			pay={{
				title: 'Pay for Registration',
				acc_no: '' + registration?.invoice_details?.invoice_number!,
				amount: +registration?.invoice_details?.balance_due!,
				subtitle: 'Registration for ' + registration?.cadre!,
				transaction: Transactions.Registration,
				redirectPath: '/registrationapplications',
			}}
		/>
	);
};

export default PayRegHist;
