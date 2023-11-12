import React from 'react';
import { View, StyleSheet, Text, useWindowDimensions } from 'react-native';
import { primaryColor } from '../../constants/Colors';
import globalStyles from '../../styles/global';
import { Icon } from 'react-native-paper';

const GeneralModule = () => {
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
				<Text style={styles.titleText}>General</Text>
			</View>
			<View
				style={[
					styles.box,
					styles.card,
					styles.inner,
					{ height: usableWidth * 1.2 },
				]}>
				<View style={styles.leftContent}>
					<Icon
						size={60}
						source={require('../../assets/images/knowledge.png')}
					/>
					<View
						style={{
							marginVertical: 10,
						}}>
						<Text>Knowledge Base</Text>
					</View>
				</View>
				<View style={styles.verticalDivider} />
				<View style={styles.rightContent}>
					<Icon size={60} source={require('../../assets/images/fa4q.png')} />
					<View
						style={{
							marginVertical: 10,
						}}>
						<Text>FAQs</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	box: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	leftContent: {
		flex: 1,
		marginRight: 2,
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	verticalDivider: {
		width: 2,
		height: '90%',
		backgroundColor: '#b3a8c8',
	},
	rightContent: {
		flex: 1,
		marginLeft: 2,
		justifyContent: 'center',
		alignItems: 'center',
	},

	inner: {
		marginHorizontal: 10,
	},

	card: {
		backgroundColor: 'white',
		borderRadius: 8,
		padding: 5,
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 14,
	},

	titleText: {
		fontSize: 18,
	},
});

export default GeneralModule;
