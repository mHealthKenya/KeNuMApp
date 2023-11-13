import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useAuth } from '../../providers/auth';

const More = () => {
	const { logout } = useAuth();
	return (
		<View>
			<Button
				mode='contained'
				onPress={() => logout()}
				style={{
					marginHorizontal: 20,
					marginVertical: 20,
					borderRadius: 8,
				}}>
				Logout
			</Button>
		</View>
	);
};

export default More;

const styles = StyleSheet.create({});
