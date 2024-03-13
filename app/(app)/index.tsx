import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AltHome from '../../components/home/alt';

const Home = () => {
	return (
		<>
			<AltHome />
			<StatusBar style='light' />
		</>
	);
};

export default Home;
