import React, {FC, useCallback, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import globalStyles from '../../styles/global';
import LBox from './lbox';
import {ScrollView} from 'react-native';
import {LicenceApplication} from '../../models/licenceapplications';
import useAuthenticatedUser from '../../services/auth/authenticated';
import {ActivityIndicator} from 'react-native-paper';
import {primaryColor} from '../../constants/Colors';
import DownloadBox from './downloadbox';
import dayjs from 'dayjs';

interface Props {
	applications: LicenceApplication[];
}

interface Condition {
	hasActiveLicence: boolean;
	hasRequisiteCPD: boolean;
	hasPendingApplications: boolean;
}

enum Conditions {
	HAS_LICENCE = 'HAS_LICENCE',
	NO_CPD = 'NO_CPD',
	HAS_PENDING = 'PENDING',
}

const LicenceHomeComponent: FC<Props> = ({applications}) => {
	const {data, isLoading} = useAuthenticatedUser();

	if (isLoading) {
		return (
			<View style={[globalStyles.container, globalStyles.center]}>
				<ActivityIndicator size='large' color={primaryColor} />
			</View>
		);
	}

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

	const statements = useCallback(
		(conditions: Condition) => {
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
		},
		[hasActiveLicence, hasPendingApplications, hasRequisiteCPD]
	);

	const [can, setCan] = useState(false);

	const [condition, setCondition] = useState<Conditions>(Conditions.HAS_LICENCE);

	useEffect(() => {
		setCan(!(hasActiveLicence && hasPendingApplications && hasRequisiteCPD));

		if (hasActiveLicence && hasPendingApplications && hasRequisiteCPD) {
			setCondition(Conditions.HAS_LICENCE);
		}
	}, [hasActiveLicence, hasRequisiteCPD, hasPendingApplications]);

	return (
		<View style={globalStyles.container}>
			<ScrollView style={{flex: 1}}>
				{can ? (
					<LBox
						box={{
							title: 'Licence Renewal',
							content: 'Complete your annual licence renewal',
							backgroundColor: '#dcf0fa',
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
						backgroundColor: '#dcf0fa',
						path: require('../../assets/images/clock.png'),
						route: '/licenceapplications',
					}}
				/>
			</ScrollView>
		</View>
	);
};

export default LicenceHomeComponent;
