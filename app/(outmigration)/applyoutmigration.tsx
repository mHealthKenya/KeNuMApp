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
	if (isLoading) {
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
			/>
			<StatusBar style='light' />
		</>
	);
};

export default OutMigrationApply;
