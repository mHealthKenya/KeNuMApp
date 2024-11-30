import {Redirect} from 'expo-router';
import {Drawer} from 'expo-router/drawer';
import React from 'react';
import {Image, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ActivityIndicator} from 'react-native-paper';
import Greeting from '../../components/home/greeting';
import CustomDrawer from '../../components/shared/Drawer';
import {primaryColor} from '../../constants/Colors';
import {useAuth} from '../../providers/auth';
import globalStyles from '../../styles/global';

const AppLayout = () => {
	const {isAuthenticated, isLoading} = useAuth();

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
