import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import InternshipApplyComponent from '../../components/internship/apply';
import CenterLoad from '../../components/shared/CenterLoad';
import WarnAlert from '../../components/shared/WarnAlert';
import useAuthenticatedUser from '../../services/auth/authenticated';
import useInternshipCenters from '../../services/internship/centers';

const InternshipApply = () => {
	const { data = [], mutate, isError } = useInternshipCenters();

	const { data: activeData, isLoading } = useAuthenticatedUser();

	useEffect(() => {
		mutate();
	}, []);

	return (
		<>
			{isError ? (
				<View style={{ marginTop: 25 }}>
					<WarnAlert message='Could not fetch internship centers. Please check your network connection and try again' />
				</View>
			) : isLoading ? (
				<CenterLoad />
			) : (
				<InternshipApplyComponent centers={data} user={activeData!} />
			)}
			<StatusBar style='light' />
		</>
	);
};

export default InternshipApply;
