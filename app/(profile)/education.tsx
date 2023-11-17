import React from 'react';
import EducationComponent from '../../components/profile/education';
import { useAuth } from '../../providers/auth';
import { StatusBar } from 'expo-status-bar';

const Education = () => {
	const { user } = useAuth();
	return (
		<>
			<EducationComponent user={user} />
			<StatusBar style='dark' />
		</>
	);
};

export default Education;
