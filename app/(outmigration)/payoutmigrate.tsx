import React from 'react';
import PayComponent from '../../components/payments/pay';
import { Transactions } from '../../enums/transactions';
import { useOutMigrationFetched } from '../../providers/outmigrationprovider';
import useApplyOutMigration from '../../services/outmigration/apply';
import useAuthenticatedUser from '../../services/auth/authenticated';
import useOutMigrationHistorys from '../../services/outmigration/outmigrationapplicationhistory';

const PayOutMigrate = () => {
    const { data: user, isLoading: loadingUser } = useAuthenticatedUser();

    const { data } = useOutMigrationHistorys(user?.IndexNo || '')

	return (
		<PayComponent
			pay={{
				title: 'Pay Out-Migration',
				acc_no: data ? data[0].invoice_no : '',
				amount: data ? +data[0].amount_due : 0,
				subtitle: 'Out Migration Application Fee',
				transaction: Transactions.OutMigration,
				redirectPath: '/outmigrationhome',
			}}
		/>
	);
};

export default PayOutMigrate;
