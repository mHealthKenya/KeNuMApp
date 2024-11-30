import {StatusBar} from 'expo-status-bar';
import {useAtom} from 'jotai';
import React from 'react';
import {View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {countAtom} from '../../atoms/county';
import ApplyPrivateComponent from '../../components/privatepractice/apply';
import {primaryColor} from '../../constants/Colors';
import useAuthenticatedUser from '../../services/auth/authenticated';
import useCounties from '../../services/general/counties';
import useWorkStations from '../../services/general/workstations';
import usePracticeMode from '../../services/privatepractice/mode';
import useProposed from '../../services/privatepractice/proposed';
import globalStyles from '../../styles/global';

const PrivateApply = () => {
	const [selectedCounty, _] = useAtom(countAtom);
	const {data: counties = [], isLoading} = useCounties();
	const {data: proposed, isLoading: loadingProposed} = useProposed();
	const {data: modes, isLoading: loadingModes} = usePracticeMode();
	const {data: stations = [], isLoading: loadingWorkStations} = useWorkStations(selectedCounty);
	const {data: user} = useAuthenticatedUser();
	if (isLoading || loadingProposed || loadingModes) {
		return (
			<View style={[globalStyles.container, globalStyles.center]}>
				<ActivityIndicator size='large' color={primaryColor} />
			</View>
		);
	}
	return (
		<>
			<ApplyPrivateComponent
				counties={counties}
				proposed={proposed}
				modes={modes}
				stations={stations}
				loadingStations={loadingWorkStations}
				user={user || {}}
			/>
			<StatusBar style='light' />
		</>
	);
};

export default PrivateApply;
