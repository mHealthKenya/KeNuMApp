import React from 'react';
import HomeComponent from '../../components/home';
import { StatusBar } from 'expo-status-bar';
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
