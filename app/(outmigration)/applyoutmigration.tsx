import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import ApplyPrivateComponent from '../../components/privatepractice/apply';
import { primaryColor } from '../../constants/Colors';
import useCounties from '../../services/general/counties';
import globalStyles from '../../styles/global';
import ApplyOutComponent from '../../components/outmigration/apply';
import { countries } from 'countries-list';
import useAuthenticatedUser from '../../services/auth/authenticated';
import useEmploymentStatus from '../../services/outmigration/employementstatus';
import useEmploymentPeriod from '../../services/outmigration/employmentperiod';
import useMaritalStatus from '../../services/outmigration/maritalstatus';
import useOutMigrationReason from '../../services/outmigration/reason';
import usePlanToReturn from '../../services/outmigration/plantoreturn';
import useWorkStations from '../../services/general/workstations';

export interface DropDownItem {
	label: string;
	value: string;
}

const OutMigrationApply = () => {
	const { data: user } = useAuthenticatedUser();
	const [names, setNames] = useState<DropDownItem[]>([]);

	useEffect(() => {
		const item: DropDownItem[] = Object.values(countries).map((val) => ({
			label: val.name,
			value: val.name,
		}));

		setNames(item);
	}, []);

	const { data: counties = [], isLoading } = useCounties();
	const {data: employementstatus, isLoading: loadingStatus, } = useEmploymentStatus();
	const {data: employmentperiod, isLoading: loadingPeriod,} = useEmploymentPeriod();
	const { data: maritalstatus, isLoading: loadingMarital,} = useMaritalStatus();
	const { data: outmigratereturn, isLoading: loadingReturn,} = usePlanToReturn();
	const {data: outmigrateReason, isLoading: loadingReason,} = useOutMigrationReason();
	const {data: workstations, isLoading: loadingWorkStation,} = useWorkStations();


	if (isLoading || loadingStatus || loadingPeriod || loadingMarital || loadingReason || loadingReturn) {
		return (
			<View style={[globalStyles.container, globalStyles.center]}>
				<ActivityIndicator size='large' color={primaryColor} />
			</View>
		);
	}
	return (
		<>
			<ApplyOutComponent
				counties={counties}
				countries={names}
				user={user || {}}
				employmentStatus={employementstatus}
				employmentPeriod={employmentperiod}
				marital_status={maritalstatus}
				planToReturn={outmigratereturn}
				reasonToApply={outmigrateReason}
			/>
			<StatusBar style='light' />
		</>
	);
};

export default OutMigrationApply;
