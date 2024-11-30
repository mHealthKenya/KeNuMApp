import {StatusBar} from 'expo-status-bar';
import React from 'react';
import StudentsHome from '../../components/home/studentsalt';
import {useAuth} from '../../providers/auth';
import Home from '../../components/home';

const HomePage = () => {
	const {user} = useAuth();
	return (
		<>
			{user?.registration && user?.registration?.length > 0 ? <Home /> : <StudentsHome />}

			<StatusBar style='light' />
		</>
	);
};

export default HomePage;
