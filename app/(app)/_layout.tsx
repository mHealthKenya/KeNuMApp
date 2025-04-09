import {Redirect, Stack} from 'expo-router';
import {Drawer} from 'expo-router/drawer';
import React from 'react';
import {Image} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Greeting from '../../components/home/greeting';
import ProfileHeaderLeft from '../../components/profile/HeaderLeft';
import CenterLoad from '../../components/shared/CenterLoad';
import CustomDrawer from '../../components/shared/Drawer';
import {useAuth} from '../../providers/auth';
import {useDimensions} from '../../providers/dimensions';
import useAuthenticatedUser from '../../services/auth/authenticated';

const AppLayout = () => {
	const {isAuthenticated, isLoading} = useAuth();
	const {isLoading: loadingAuth} = useAuthenticatedUser();

	const {portrait} = useDimensions();

	if (isLoading || loadingAuth) {
		return <CenterLoad />;
	}

	if (!isAuthenticated) {
		return <Redirect href='/login' />;
	}

	if (!portrait) {
		return (
			<Stack
				screenOptions={{
					header: () => <Greeting />,
				}}>
				<Stack.Screen
					name='profile'
					options={{
						title: 'Profile',
						headerLeft: () => <ProfileHeaderLeft />,
						headerTitleAlign: 'center',
						headerStyle: {
							backgroundColor: '#3c6470',
						},

						headerTitleStyle: {
							color: '#FFF',
						},
					}}
				/>
			</Stack>
		);
	}

	return (
		<GestureHandlerRootView style={{flex: 1}}>
			<Drawer
				drawerContent={(props) => <CustomDrawer {...props} />}
				screenOptions={{
					header: () => <Greeting />,
				}}>
				<Drawer.Screen
					name='index'
					options={{
						drawerLabel: 'Home',
						drawerLabelStyle: {
							fontFamily: 'normal',
						},
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
						drawerLabel: 'My Account',

						drawerLabelStyle: {
							fontFamily: 'normal',
						},
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
		</GestureHandlerRootView>
	);
};

export default AppLayout;
