import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import InternshipApplyComponent from '../../components/internship/apply';
import { StatusBar } from 'expo-status-bar';
import useInternshipCenters from '../../services/internship/centers';
import { useFocusEffect } from 'expo-router/src/useFocusEffect';
import globalStyles from '../../styles/global';
import { primaryColor } from '../../constants/Colors';
import { ActivityIndicator } from 'react-native-paper';
import WarnAlert from '../../components/shared/WarnAlert';
import { useAuth } from '../../providers/auth';

const InternshipApply = () => {
	const { data = [], mutate, isPending, isError } = useInternshipCenters();

	const { user } = useAuth();

	useEffect(() => {
		mutate();
	}, []);

	// if (isPending) {
	// 	return (
	// 		<View style={[globalStyles.container, globalStyles.center]}>
	// 			<ActivityIndicator size='large' color={primaryColor} />
	// 		</View>
	// 	);
	// }

	return (
		<>
			{isError ? (
				<View style={{ marginTop: 25 }}>
					<WarnAlert message='Could not fetch internship centers. Please check your network connection and try again' />
				</View>
			) : (
				<InternshipApplyComponent centers={data} user={user} />
			)}
			<StatusBar style='light' />
		</>
	);
};

export default InternshipApply;
