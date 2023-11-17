import React from 'react';
import {
	Pressable,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from 'react-native';
import { Icon } from 'react-native-paper';
import { useAuth } from '../../providers/auth';
import globalStyles from '../../styles/global';
import { useRouter } from 'expo-router';

const StudentsModule = () => {
	const { width, height } = useWindowDimensions();
	const { checkAuth } = useAuth();

	const router = useRouter();
	const dimension = Math.min(width, height);

	const availableWidth = dimension - 30;

	const usableWidth = (availableWidth - 20) / 3;

	return (
		<View
			style={[
				globalStyles.column,
				{ height: height * 0.3, justifyContent: 'space-evenly' },
			]}>
			<View style={[styles.inner]}>
				<Text style={styles.titleText}>Student's Module</Text>
			</View>
			<View
				style={[
					styles.inner,
					globalStyles.row,
					{ justifyContent: 'space-around' },
				]}>
				<Pressable
					style={[styles.square, { width: usableWidth, height: usableWidth }]}
					onPress={() => router.push('/internship')}>
					<Icon
						size={usableWidth * 0.6}
						source={require('../../assets/images/internsh.png')}
					/>
					<Text>Internships</Text>
				</Pressable>
				<Pressable
					style={[styles.square, { width: usableWidth, height: usableWidth }]}
					onPress={() => checkAuth()}>
					<Icon
						size={usableWidth * 0.6}
						source={require('../../assets/images/exams.png')}
					/>
					<Text>Exams</Text>
				</Pressable>

				<View
					style={[styles.square, { width: usableWidth, height: usableWidth }]}>
					<Icon
						size={usableWidth * 0.6}
						source={require('../../assets/images/register.png')}
					/>
					<Text>Registration</Text>
				</View>
			</View>
		</View>
	);
};

export default StudentsModule;

const styles = StyleSheet.create({
	square: {
		backgroundColor: '#eaf2fa',
		borderRadius: 8,
		justifyContent: 'space-around',
		alignItems: 'center',
	},

	inner: {
		marginHorizontal: 10,
	},

	titleText: {
		fontSize: 18,
	},
});
