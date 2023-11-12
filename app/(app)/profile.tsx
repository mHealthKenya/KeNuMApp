import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import globalStyles from '../../styles/global';
import ProfileComponent from '../../components/profile';

const Profile = () => {
	return (
		<View style={[globalStyles.container]}>
			<ProfileComponent />
		</View>
	);
};

export default Profile;

const styles = StyleSheet.create({});
