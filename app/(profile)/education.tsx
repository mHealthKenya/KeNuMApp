import React from 'react';
import EducationComponent from '../../components/profile/education';
import { useAuth } from '../../providers/auth';
import { StatusBar } from 'expo-status-bar';
import useAuthenticatedUser from '../../services/auth/authenticated';

const Education = () => {
	const { user } = useAuth();

	const { data } = useAuthenticatedUser();
	return (
		<>
			<EducationComponent user={data} />
			<StatusBar style='dark' />
		</>
	);
};

export default Education;
