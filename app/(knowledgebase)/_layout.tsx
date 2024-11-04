import {Stack} from 'expo-router';
import React from 'react';
import ProfileHeaderLeft from '../../components/profile/HeaderLeft';
import KnowledgeProvider from '../../providers/knowledge';

const KnowledgeLayout = () => {
	return (
		<KnowledgeProvider>
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
					name='segmented'
					options={{
						title: 'Knowledge Base',
						headerLeft: () => <ProfileHeaderLeft />,
					}}
				/>
				<Stack.Screen
					name='allknowledge'
					options={{
						title: 'Policies and Manual',
						headerLeft: () => <ProfileHeaderLeft />,
					}}
				/>

				<Stack.Screen
					name='research'
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name='codec'
					options={{
						headerShown: false,
					}}
				/>
			</Stack>
		</KnowledgeProvider>
	);
};

export default KnowledgeLayout;
