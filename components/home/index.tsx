import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import globalStyles from '../../styles/global';
import { Button } from 'react-native-paper';
import { useAuth } from '../../providers/auth';

const HomeComponent = () => {
	const { logout } = useAuth();
	return (
		<View style={[globalStyles.container, globalStyles.center]}>
			<Text>HomeComponent</Text>
			<Button mode='contained' onPress={() => logout()}>
				Logout
			</Button>
		</View>
	);
};

export default HomeComponent;

const styles = StyleSheet.create({});
