import { useFocusEffect, useRouter } from 'expo-router';
import React from 'react';
import LoginComponent from '../components/auth/Login';
import { useAuth } from '../providers/auth';
import { View } from 'react-native';
import globalStyles from '../styles/global';
import { primaryColor } from '../constants/Colors';
import { ActivityIndicator } from 'react-native-paper';

const Login = () => {
	const { isAuthenticated, isLoggingOut } = useAuth();

	console.log({
		isLoggingOut,
	});

	const router = useRouter();

	useFocusEffect(() => {
		if (isAuthenticated) {
			router.replace('/');
		}
	});

	if (isLoggingOut) {
		return (
			<View style={[globalStyles.container, globalStyles.center]}>
				<ActivityIndicator size='large' color={primaryColor} />
			</View>
		);
	}

	return <LoginComponent />;
};

export default Login;
