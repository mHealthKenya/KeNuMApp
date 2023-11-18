import React from 'react';
import AllHistoryComponent from '../../components/internship/history';
import { StatusBar } from 'expo-status-bar';

const AllHistory = () => {
	return (
		<>
			<AllHistoryComponent />
			<StatusBar style='light' />
		</>
	);
};

export default AllHistory;
