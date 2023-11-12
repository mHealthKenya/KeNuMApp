import { Redirect, Stack, Tabs } from 'expo-router';
import React from 'react';
import { useAuth } from '../../providers/auth';
import globalStyles from '../../styles/global';
import { Text, View } from 'react-native';
import { ActivityIndicator, Icon } from 'react-native-paper';
import { primaryColor } from '../../constants/Colors';

const AppLayout = () => {
	const { isAuthenticated, isLoading } = useAuth();

	if (isLoading) {
		return (
			<View style={[globalStyles.container, globalStyles.center]}>
				<ActivityIndicator size='large' color={primaryColor} />
			</View>
		);
	}

	if (!isAuthenticated) {
		return <Redirect href='/login' />;
	}

	return (
		<Tabs
			screenOptions={{
				headerTitleAlign: 'center',
				headerStyle: {
					backgroundColor: '#0445b5',
				},

				headerTitleStyle: {
					color: '#FFF',
				},
			}}>
			<Tabs.Screen
				name='index'
				options={{
					title: 'KeNuM',
					tabBarIcon: ({ focused }) => (
						<Icon size={20} source={require('../../assets/images/home0.png')} />
					),

					tabBarLabel: 'Home',
					tabBarLabelStyle: {
						fontSize: 14,
					},
					tabBarActiveTintColor: primaryColor,
				}}
			/>

			<Tabs.Screen
				name='profile'
				options={{
					title: 'Profile',
					tabBarIcon: ({ focused }) => (
						<Icon
							size={20}
							source={require('../../assets/images/prof44.png')}
						/>
					),
					tabBarLabelStyle: {
						fontSize: 14,
					},

					tabBarActiveTintColor: primaryColor,
				}}
			/>

			<Tabs.Screen
				name='more'
				options={{
					title: 'More',
					tabBarIcon: ({ focused }) => (
						<Icon size={20} source={require('../../assets/images/more3.png')} />
					),
					tabBarLabelStyle: {
						fontSize: 14,
					},

					tabBarActiveTintColor: primaryColor,
				}}
			/>

			<Tabs.Screen
				name='error'
				options={{
					title: 'Error',
					href: null,
				}}
			/>
		</Tabs>
	);
};

export default AppLayout;
