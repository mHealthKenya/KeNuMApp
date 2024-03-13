import { StatusBar } from 'expo-status-bar';
import React from 'react';
import InternshipComponent from '../../components/internship';

const Internship = () => {
	return (
		<>
			<InternshipComponent />
			<StatusBar style='light' />
		</>
	);
};

export default Internship;
