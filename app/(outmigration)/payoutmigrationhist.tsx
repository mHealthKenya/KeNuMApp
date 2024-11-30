import {useAtom} from 'jotai';
import React from 'react';
import {outmigrationGenAtom} from '../../atoms/outmigration';
import PayComponent from '../../components/payments/pay';
import {Transactions} from '../../enums/transactions';

const PayOutmigrationHist = () => {
	const [outmigration, _] = useAtom(outmigrationGenAtom);

	return (
		<PayComponent
			pay={{
				title: 'Pay for Outmigration',
				acc_no: '' + outmigration?.invoice_details?.invoice_number!,
				amount: +outmigration?.invoice_details?.balance_due!,
				subtitle: 'Outmigration Payment',
				transaction: Transactions.Outmigration,
				redirectPath: '/outmigrationhist',
			}}
		/>
	);
};

export default PayOutmigrationHist;
