import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import OutmigrationApplicationsComponent from '../../components/outmigration/applications';
import useAuthenticatedUser from '../../services/auth/authenticated';
import useOutmigrationApplications from '../../services/outmigration/applications';

const OutMigrationApplications = () => {
	const {data: user, isLoading: loadingUser} = useAuthenticatedUser();
	const {
		data: outmigrations = [],
		isLoading: loadingApplications,
		refetch,
		isRefetching,
	} = useOutmigrationApplications(user?.id || '');

	if (loadingUser || loadingApplications) {
		return (
			<View className='flex flex-1 justify-center items-center'>
				<ActivityIndicator />
			</View>
		);
	}

	return (
		<>
			<OutmigrationApplicationsComponent applications={outmigrations} refetch={refetch} isRefetching={isRefetching} />
			<StatusBar style='light' />
		</>
	);
};

export default OutMigrationApplications;
