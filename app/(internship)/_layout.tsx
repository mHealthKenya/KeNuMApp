import {Stack} from 'expo-router';
import React from 'react';
import ProfileHeaderLeft from '../../components/profile/HeaderLeft';
import InternshipProvider from '../../providers/internship';

const InternshipLayout = () => {
	return (
		<InternshipProvider>
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
					name='internship'
					options={{
						title: 'My Internships',
						headerLeft: () => <ProfileHeaderLeft />,

						headerTitleStyle: {
							color: '#eaf2fa',
						},
					}}
				/>

				<Stack.Screen
					name='internshipapply'
					options={{
						title: 'Internship Application',
						headerLeft: () => <ProfileHeaderLeft />,

						headerTitleStyle: {
							color: '#eaf2fa',
						},
					}}
				/>

				<Stack.Screen
					name='internshiphistory'
					options={{
						title: 'Internships History',
						headerLeft: () => <ProfileHeaderLeft />,

						headerTitleStyle: {
							color: '#eaf2fa',
						},
					}}
				/>

				<Stack.Screen
					name='internshippayhistory'
					options={{
						title: 'Pay For Internship',
						headerLeft: () => <ProfileHeaderLeft />,
					}}
				/>

				<Stack.Screen
					name='checkin'
					options={{
						title: 'Internship Checkin',
						headerLeft: () => <ProfileHeaderLeft />,
					}}
				/>

				<Stack.Screen
					name='verifyotpcheck'
					options={{
						headerShown: false,
						presentation: 'modal',
					}}
				/>

				<Stack.Screen
					name='internshipareas'
					options={{
						title: 'Internship Areas',
						headerLeft: () => <ProfileHeaderLeft />,
					}}
				/>

				<Stack.Screen
					name='rotationareas'
					options={{
						title: 'Rotation Areas',
						headerLeft: () => <ProfileHeaderLeft />,
					}}
				/>

				<Stack.Screen
					name='competencies'
					options={{
						title: 'Rotation Competencies',
						headerLeft: () => <ProfileHeaderLeft />,
					}}
				/>

				<Stack.Screen
					name='competencyadd'
					options={{
						title: 'Record Competency',
						headerLeft: () => <ProfileHeaderLeft />,
					}}
				/>

				<Stack.Screen
					name='transfer'
					options={{
						title: 'Internship Transfer',
						headerLeft: () => <ProfileHeaderLeft />,
					}}
				/>

				<Stack.Screen
					name='allhistory'
					options={{
						title: 'Internship History',
						headerLeft: () => <ProfileHeaderLeft />,
					}}
				/>

				<Stack.Screen
					name='transferhist'
					options={{
						title: 'Transfer History',
						headerLeft: () => <ProfileHeaderLeft />,
					}}
				/>

				<Stack.Screen
					name='rotationactivities'
					options={{
						title: 'Rotation Activities',
						headerLeft: () => <ProfileHeaderLeft />,
					}}
				/>

				<Stack.Screen
					name='checkins'
					options={{
						title: 'Check Ins History',
						headerLeft: () => <ProfileHeaderLeft />,
					}}
				/>
			</Stack>
		</InternshipProvider>
	);
};

export default InternshipLayout;
