import {StatusBar} from 'expo-status-bar';
import React from 'react';
import Home from '../../components/home';
import StudentsHome from '../../components/home/studentsalt';
import CenterLoad from '../../components/shared/CenterLoad';
import useAuthenticatedUser from '../../services/auth/authenticated';

const HomePage = () => {
	const {data: user, isLoading} = useAuthenticatedUser();

	if (isLoading) {
		return <CenterLoad />;
	}
	return (
		<>
			{user?.registration && user?.registration?.length > 0 ? <Home /> : <StudentsHome />}

			<StatusBar style='light' />
		</>
	);
};

export default HomePage;
