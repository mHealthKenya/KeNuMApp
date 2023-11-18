import { View, Text } from 'react-native';
import React from 'react';
import InternshipComponent from '../../components/internship';
import { StatusBar } from 'expo-status-bar';

const Internship = () => {
	return (
		<>
			<InternshipComponent />
			<StatusBar style='light' />
		</>
	);
};

export default Internship;
