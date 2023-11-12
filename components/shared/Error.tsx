import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import {
	Image,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from 'react-native';
import { Button } from 'react-native-paper';
import { useError } from '../../providers/error';

const ErrorComponent = () => {
	const { clearError, error } = useError();
	const router = useRouter();

	useEffect(() => {
		return () => {
			clearError();
		};
	}, []);

	const { width, height } = useWindowDimensions();

	const handleClose = () => {
		clearError();
		router.back();
	};

	return (
		<View style={styles.container}>
			<Image
				source={require('../../assets/images/400.png')}
				style={{
					width: width * 0.85,
					height: height * 0.4,
				}}
			/>
			<View style={styles.box}>
				<Text style={styles.text}>{error}</Text>
				<Button mode='contained' onPress={handleClose}>
					Close
				</Button>
			</View>
		</View>
	);
};

export default ErrorComponent;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	box: {
		flexDirection: 'column',
		gap: 10,
	},

	text: {
		fontSize: 20,
		textTransform: 'capitalize',
		margin: 10,
	},
});
