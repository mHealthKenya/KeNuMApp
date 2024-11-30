import {StatusBar} from 'expo-status-bar';
import {useAtom} from 'jotai';
import React from 'react';
import {View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {diasporaAtom} from '../../atoms/diaporaatom';
import LicenceApplicationComponent from '../../components/licence/apply';
import {Item} from '../../components/licence/licencebox';
import {primaryColor} from '../../constants/Colors';
import {useWorkStationFetched} from '../../providers/workstations';
import useEmployers from '../../services/licence/employers';
import globalStyles from '../../styles/global';

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

	if (isLoading) {
		return (
			<View style={[globalStyles.container, globalStyles.center]}>
				<ActivityIndicator size='large' color={primaryColor} />
			</View>
		);
	}

	return (
		<>
			<LicenceApplicationComponent
				employers={data}
				county={diaspora ? diaC : county!}
				workstation={diaspora ? workStationC : workStation!}
			/>
			<StatusBar style='light' />
		</>
	);
};

export default LicenceApplication;
