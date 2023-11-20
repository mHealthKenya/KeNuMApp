import { Stack } from 'expo-router';
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
					name='allknowledge'
					options={{
						title: 'Knowledge Base',
						headerLeft: () => <ProfileHeaderLeft />,
					}}
				/>
			</Stack>
		</KnowledgeProvider>
	);
};

export default KnowledgeLayout;
