import React from 'react';
import PayComponent from '../../components/payments/pay';
import { Transactions } from '../../enums/transactions';
import { useRegistrationFetched } from '../../providers/registrationprovider';
import { useLicenceFetched } from '../../providers/licenceprovider';

const PayLicenceHist = () => {
	const { licence } = useLicenceFetched();

	return (
		<PayComponent
			pay={{
				title: 'Pay for Licence',
				acc_no: '' + licence?.invoice_no!,
				amount: +licence?.balance_due!,
				subtitle: 'Licence Renewal',
				transaction: Transactions.Licence,
				redirectPath: '/licenceapplications',
			}}
		/>
	);
};

export default PayLicenceHist;
