import {StatusBar} from 'expo-status-bar';
import React from 'react';
import PrivatePracticeHome from '../../components/privatepractice';

const PrivatePracticeLanding = () => {
	return (
		<>
			<PrivatePracticeHome />
			<StatusBar style='light' />
		</>
	);
};

export default PrivatePracticeLanding;
