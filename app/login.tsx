import { useFocusEffect, useRouter } from 'expo-router';
import React from 'react';
import LoginComponent from '../components/auth/Login';
import { useAuth } from '../providers/auth';

const Login = () => {
	const { isAuthenticated } = useAuth();

	const router = useRouter();

	useFocusEffect(() => {
		if (isAuthenticated) {
			router.replace('/');
		}
	});

	return <LoginComponent />;
};

export default Login;
