import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import ProfileHeaderLeft from '../../components/profile/HeaderLeft';
import { useAuth } from '../../providers/auth';

const InternshipLayout = () => {
	return (
		<Stack
			screenOptions={{
				headerTitleAlign: 'center',
				headerStyle: {
					backgroundColor: '#0445b5',
				},

				headerTitleStyle: {
					color: '#FFF',
				},
			}}>
			<Stack.Screen
				name='series'
				options={{
					title: 'Exam Series',
					headerLeft: () => <ProfileHeaderLeft />,
				}}
			/>

			<Stack.Screen
				name='applyexam'
				options={{
					title: 'Exam Application',
					headerLeft: () => <ProfileHeaderLeft />,
				}}
			/>

			<Stack.Screen
				name='examapplications'
				options={{
					title: 'Exam Applications',
					headerLeft: () => <ProfileHeaderLeft />,
				}}
			/>

			<Stack.Screen
				name='examall'
				options={{
					title: 'My Exams',
					headerLeft: () => <ProfileHeaderLeft />,
				}}
			/>

			<Stack.Screen
				name='examresults'
				options={{
					title: 'My Results',
					headerLeft: () => <ProfileHeaderLeft />,
				}}
			/>

			<Stack.Screen
				name='payexamhist'
				options={{
					headerShown: false,
					presentation: 'modal',
				}}
			/>

			<Stack.Screen
				name='payexam'
				options={{
					headerShown: false,
					presentation: 'modal',
				}}
			/>
		</Stack>
	);
};

export default InternshipLayout;
