import {StatusBar} from 'expo-status-bar';
import React from 'react';
import StudentsHome from '../../components/home/studentsalt';
import {useAuth} from '../../providers/auth';
import AltHome from '../../components/home/alt';

const Home = () => {
	const {user} = useAuth();
	return (
		<>
			{user?.registration && user?.registration?.length > 0 ? <AltHome /> : <StudentsHome />}

			<StatusBar style='light' />
		</>
	);
};

export default Home;
