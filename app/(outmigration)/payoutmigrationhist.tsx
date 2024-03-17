import {useAtom} from 'jotai';
import React from 'react';
import {licenceApplicationAtom} from '../../atoms/licence';
import PayComponent from '../../components/payments/pay';
import {Transactions} from '../../enums/transactions';
import {outmigrationGenAtom} from '../../atoms/outmigration';

const PayOutmigrationHist = () => {
	const [outmigration, _] = useAtom(outmigrationGenAtom);

	return (
		<PayComponent
			pay={{
				title: 'Pay for Outmigration',
				acc_no: '' + outmigration?.invoice_no!,
				amount: +outmigration?.balance_due!,
				subtitle: 'Outmigration Payment',
				transaction: Transactions.Outmigration,
				redirectPath: '/outmigrationhist',
			}}
		/>
	);
};

export default PayOutmigrationHist;
