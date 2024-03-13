import React from 'react';
import PayComponent from '../../components/payments/pay';
import {Transactions} from '../../enums/transactions';
import {useRegistrationFetched} from '../../providers/registrationprovider';
import {useAtom} from 'jotai';
import {registrationAtom} from '../../atoms/registration';

const PayRegHist = () => {
	const [registration, _] = useAtom(registrationAtom);

	return (
		<PayComponent
			pay={{
				title: 'Pay for Registration',
				acc_no: '' + registration?.invoice_no!,
				amount: +registration?.balance_due!,
				subtitle: 'Registration for ' + registration?.cadre!,
				transaction: Transactions.Registration,
				redirectPath: '/registrationapplications',
			}}
		/>
	);
};

export default PayRegHist;
