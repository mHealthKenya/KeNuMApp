import { Redirect } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { Image, View, useWindowDimensions } from 'react-native';
import { ActivityIndicator, Divider, Icon } from 'react-native-paper';
import { primaryColor } from '../../constants/Colors';
import { useAuth } from '../../providers/auth';
import globalStyles from '../../styles/global';
import CustomDrawer from '../../components/shared/Drawer';

const AppLayout = () => {
	const { isAuthenticated, isLoading } = useAuth();

	const { height } = useWindowDimensions();

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
		<Drawer
			drawerContent={(props) => <CustomDrawer {...props} />}
			screenOptions={{
				headerTitleAlign: 'center',
				headerStyle: {
					backgroundColor: '#0445b5',
				},

				drawerStyle: {
					backgroundColor: '#eaf2fa',
				},

				headerTintColor: '#FFF',

				headerTitleStyle: {
					color: '#FFF',
				},
			}}>
			<Drawer.Screen
				name='index'
				options={{
					title: 'KeNuM',
					drawerLabel: 'Home',
					drawerIcon: () => (
						<Image
							source={require('../../assets/images/home0.png')}
							style={{
								width: 25,
								height: 25,
							}}
						/>
					),
				}}
			/>

			<Drawer.Screen
				name='profile'
				options={{
					title: 'My Account',
					drawerLabel: 'My Account',
					drawerIcon: () => (
						<Image
							source={require('../../assets/images/prof44.png')}
							style={{
								width: 25,
								height: 25,
							}}
						/>
					),
				}}
			/>

			<Drawer.Screen
				name='internship'
				options={{
					title: 'Internship',
					drawerLabel: 'Internship',
					drawerIcon: () => (
						<Image
							source={require('../../assets/images/prof44.png')}
							style={{
								width: 25,
								height: 25,
							}}
						/>
					),
				}}
			/>
		</Drawer>
	);
};

export default AppLayout;
