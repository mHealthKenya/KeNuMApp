import React from 'react';
import HomeComponent from '../../components/home';
import { StatusBar } from 'expo-status-bar';

const Home = () => {
	return (
		<>
			<HomeComponent />
			<StatusBar style='light' />
		</>
	);
};

export default Home;
