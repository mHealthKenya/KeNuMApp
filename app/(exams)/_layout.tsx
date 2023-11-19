import { Stack } from 'expo-router';
import React from 'react';
import ProfileHeaderLeft from '../../components/profile/HeaderLeft';

const ExamsLayout = () => {
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

export default ExamsLayout;
