import {countries} from 'countries-list';
import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import ApplyOutComponent from '../../components/outmigration/apply';
import {primaryColor} from '../../constants/Colors';
import useAuthenticatedUser from '../../services/auth/authenticated';
import globalStyles from '../../styles/global';

export interface DropDownItem {
	label: string;
	value: string;
}

const OutMigrationApply = () => {
	const {data: user, isLoading: loadingUser} = useAuthenticatedUser();
	const [names, setNames] = useState<DropDownItem[]>([]);

	useEffect(() => {
		const item: DropDownItem[] = Object.values(countries).map((val) => ({
			label: val.name,
			value: val.name,
		}));

		setNames(item);
	}, []);

	if (loadingUser) {
		return (
			<View style={[globalStyles.container, globalStyles.center]}>
				<ActivityIndicator size='large' color={primaryColor} />
			</View>
		);
	}
	return (
		<>
			<ApplyOutComponent countries={names} user={user || {}} />
			<StatusBar style='light' />
		</>
	);
};

export default OutMigrationApply;
