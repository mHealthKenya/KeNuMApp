import { StatusBar } from 'expo-status-bar';
import React from 'react';
import ExamAllComponent from '../../components/exams';

const AllExam = () => {
	return (
		<>
			<ExamAllComponent />
			<StatusBar style='light' />
		</>
	);
};

export default AllExam;
