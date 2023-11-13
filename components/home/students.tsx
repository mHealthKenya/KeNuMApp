import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import React from 'react';
import globalStyles from '../../styles/global';
import { Icon } from 'react-native-paper';

const StudentsModule = () => {
	const { width, height } = useWindowDimensions();

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
				<View
					style={[styles.square, { width: usableWidth, height: usableWidth }]}>
					<Icon
						size={usableWidth * 0.6}
						source={require('../../assets/images/nurse.png')}
					/>
					<Text>Internships</Text>
				</View>
				<View
					style={[styles.square, { width: usableWidth, height: usableWidth }]}>
					<Icon
						size={usableWidth * 0.6}
						source={require('../../assets/images/exams.png')}
					/>
					<Text>Exams</Text>
				</View>

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
		backgroundColor: '#ecefff',
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
