import React from 'react';
import {View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import CheckinHistoryComponent from '../../components/internship/history/checkins';
import {primaryColor} from '../../constants/Colors';
import useCheckins from '../../services/internship/checkins';
import globalStyles from '../../styles/global';
import useCounties from '../../services/general/counties';
import CountiesComponent from '../../components/licence/counties';
import {StatusBar} from 'expo-status-bar';
import useWorkStations from '../../services/general/workstations';
import {useWorkStationFetched} from '../../providers/workstations';
import WorkStationsComponent from '../../components/licence/workstations';
import useEmployers from '../../services/licence/employers';
import LicenceApplicationComponent from '../../components/licence/apply';
import {diasporaAtom} from '../../atoms/diaporaatom';
import {useAtom} from 'jotai';
import {Item} from '../../components/licence/licencebox';
import {useAuth} from '../../providers/auth';
import useLicenceApplications from '../../services/licence/applications';
import LBox from '../../components/licence/lbox';

const LicenceApplication = () => {
	const {county, workStation} = useWorkStationFetched();
	const {data = [], isLoading} = useEmployers();

	const diaC: Item = {
		title: 'Nairobi',
		id: '1',
	};

	const workStationC: Item = {
		title: 'DIASPORA',
		id: '9554',
	};

	const [diaspora, _] = useAtom(diasporaAtom);

	const {user} = useAuth();
	const {data: applications = [], isLoading: loadingApplications} = useLicenceApplications(user?.id || '');

	const hasPendingApplications = applications?.some((a) => {
		return a.invoice_details.balance_due ? +a.invoice_details.balance_due > 0 : false;
	});

	if (isLoading || loadingApplications) {
		return (
			<View style={[globalStyles.container, globalStyles.center]}>
				<ActivityIndicator size='large' color={primaryColor} />
			</View>
		);
	}

	if (hasPendingApplications) {
		return (
			<View className='flex flex-1'>
				<LBox
					box={{
						title: 'Cannot Apply',
						content: 'You have pending applications. Please clear them to apply for a new licence.',
						backgroundColor: '#984b4b',
						path: require('../../assets/images/licencesmall.png'),
						route: '/licenceapplications',
						danger: true,
					}}
				/>
			</View>
		);
	}

	return (
		<>
			<LicenceApplicationComponent
				employers={data}
				county={diaspora ? diaC : county!}
				workstation={diaspora ? workStationC : workStation!}
				applications={applications}
			/>
			<StatusBar style='light' />
		</>
	);
};

export default LicenceApplication;
