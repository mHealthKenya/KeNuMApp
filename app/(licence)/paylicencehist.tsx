import {useAtom} from 'jotai';
import React from 'react';
import {licenceApplicationAtom} from '../../atoms/licence';
import PayComponent from '../../components/payments/pay';
import {Transactions} from '../../enums/transactions';

const PayLicenceHist = () => {
	const [licence, _] = useAtom(licenceApplicationAtom);

	return (
		<PayComponent
			pay={{
				title: 'Pay for Licence',
				acc_no: '' + licence?.invoice_details?.invoice_number!,
				amount: +licence?.invoice_details?.balance_due!,
				subtitle: 'Licence Renewal',
				transaction: Transactions.Licence,
				redirectPath: '/licenceapplications',
			}}
		/>
	);
};

export default PayLicenceHist;
