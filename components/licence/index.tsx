import React, {FC} from 'react';
import {View} from 'react-native';
import globalStyles from '../../styles/global';
import LBox from './lbox';
import {ScrollView} from 'react-native';
import {LicenceApplication} from '../../models/licenceapplications';
import useAuthenticatedUser from '../../services/auth/authenticated';
import {ActivityIndicator} from 'react-native-paper';
import {primaryColor} from '../../constants/Colors';
import DownloadBox from './downloadbox';

interface Props {
	applications: LicenceApplication[];
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

	const hasActiveLicence = data?.license?.some((l) => {
		return l.to_date ? new Date(l.to_date) > new Date() : false;
	});

	const hasRequisiteCPD = data?.cpd?.every((c) => {
		return c.cpd_requirement && c.current_points ? +c.current_points >= +c.cpd_requirement : false;
	});

	const hasPendingApplications = applications?.some((a) => {
		return a.invoice_details.balance_due ? +a.invoice_details.balance_due > 0 : false;
	});

	return (
		<View style={globalStyles.container}>
			<ScrollView style={{flex: 1}}>
				{hasActiveLicence ? (
					<LBox
						box={{
							title: 'Licence Renewal',
							content: 'Complete your annual licence renewal',
							backgroundColor: '#dcf0fa',
							path: require('../../assets/images/licencesmall.png'),
							route: '/licencecountry',
						}}
					/>
				) : !hasRequisiteCPD ? (
					<LBox
						box={{
							title: 'Complete CPDs',
							content: 'Complete your CPD requirements to apply for a licence',
							backgroundColor: '#984b4b',
							path: require('../../assets/images/licencesmall.png'),
							route: '/cpdhome',
							danger: true,
						}}
					/>
				) : hasPendingApplications ? (
					<></>
				) : (
					<LBox
						box={{
							title: 'Licence Renewal',
							content: 'Complete your annual licence renewal',
							backgroundColor: '#dcf0fa',
							path: require('../../assets/images/licencesmall.png'),
							route: '/licencecountry',
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
