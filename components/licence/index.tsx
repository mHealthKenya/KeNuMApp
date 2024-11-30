import dayjs from 'dayjs';
import React, {FC, useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {LicenceApplication} from '../../models/licenceapplications';
import useAuthenticatedUser from '../../services/auth/authenticated';
import globalStyles from '../../styles/global';
import CenterLoad from '../shared/CenterLoad';
import LBox from './lbox';

interface Props {
	applications: LicenceApplication[];
}

interface Condition {
	hasActiveLicence: boolean;
	hasRequisiteCPD: boolean;
	hasPendingApplications: boolean;
}

const LicenceHomeComponent: FC<Props> = ({applications}) => {
	const {data, isLoading} = useAuthenticatedUser();

	const hasActiveLicence =
		data?.license?.some((l) => {
			return l.to_date ? new Date(l.to_date) > dayjs(new Date()).subtract(1, 'month').toDate() : false;
		}) || false;

	const hasRequisiteCPD =
		data?.cpd?.every((c) => {
			return c.cpd_requirement && c.current_points ? +c.current_points >= +c.cpd_requirement : false;
		}) || false;

	const hasPendingApplications = applications?.some((a) => {
		return a.invoice_details.balance_due ? +a.invoice_details.balance_due > 0 : false;
	});

	const statements = (conditions: Condition) => {
		const messages = [];

		if (conditions.hasActiveLicence) {
			messages.push('You already have an active licence.');
		}
		if (conditions.hasPendingApplications) {
			messages.push('You have pending licence applications.');
		}
		if (!conditions.hasRequisiteCPD) {
			messages.push('You have insufficient CPD points to renew your licence.');
		}

		if (messages.length === 0) {
			return 'You cannot renew your licence at this time';
		}

		return messages.join(' ');
	};

	const [can, setCan] = useState(false);

	useEffect(() => {
		const newCan = !(hasActiveLicence && hasPendingApplications && hasRequisiteCPD);
		if (newCan !== can) {
			setCan(newCan);
		}
	}, [hasActiveLicence, hasPendingApplications, hasRequisiteCPD, can]);

	if (isLoading) {
		return <CenterLoad />;
	}

	return (
		<View style={globalStyles.container}>
			<ScrollView style={{flex: 1}}>
				{can ? (
					<LBox
						box={{
							title: 'Licence Renewal',
							content: 'Complete your annual licence renewal',
							backgroundColor: '#FFFFFF',
							path: require('../../assets/images/licencesmall.png'),
							route: '/licencecountry',
						}}
					/>
				) : (
					<LBox
						box={{
							title: 'Cannot Renew Licence',
							content: statements({hasActiveLicence, hasPendingApplications, hasRequisiteCPD}),
							backgroundColor: '#984b4b',
							path: require('../../assets/images/licencesmall.png'),
							route: '/',
							danger: true,
						}}
					/>
				)}

				<LBox
					box={{
						title: 'Licence Applications History',
						content:
							'View a history of all your licence applications, pay for applications, and download licence invoices and receipts',
						backgroundColor: '#FFFFFF',
						path: require('../../assets/images/clock.png'),
						route: '/licenceapplications',
					}}
				/>
			</ScrollView>
		</View>
	);
};

export default LicenceHomeComponent;
