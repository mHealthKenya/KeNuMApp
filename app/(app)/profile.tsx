import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import ProfileComponent from '../../components/profile';
import globalStyles from '../../styles/global';

const Profile = () => {
	return (
		<View style={[globalStyles.container]}>
			<ProfileComponent />
			<StatusBar style='light' />
		</View>
	);
};

export default Profile;
