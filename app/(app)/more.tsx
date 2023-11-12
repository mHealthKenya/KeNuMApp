import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';
import { useRouter } from 'expo-router';

const More = () => {
	const router = useRouter();
	return (
		<View>
			<Text>More</Text>
			<Button mode='contained' onPress={() => router.push('/associations')}>
				Associations
			</Button>
		</View>
	);
};

export default More;

const styles = StyleSheet.create({});
