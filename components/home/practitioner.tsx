import { useRouter } from 'expo-router';
import React from 'react';
import {
	Pressable,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from 'react-native';
import { Icon } from 'react-native-paper';
import globalStyles from '../../styles/global';

const PractitionersModule = () => {
	const { width, height } = useWindowDimensions();

	const dimension = Math.min(width, height);

	const availableWidth = dimension - 30;

	const usableWidth = (availableWidth - 20) / 3;

	const router = useRouter();

	return (
		<View
			style={[
				globalStyles.column,
				{ height: height * 0.3, justifyContent: 'space-evenly' },
			]}>
			<View style={[styles.inner]}>
				<Text style={styles.titleText}>Practitioner's Module</Text>
			</View>
			<View
				style={[
					styles.box,
					styles.card,
					styles.inner,
					{ height: usableWidth * 1.2 },
				]}>
				<Pressable
					style={styles.leftContent}
					onPress={() => router.push('/licencehome')}>
					<Icon
						size={usableWidth * 0.6}
						source={require('../../assets/images/licences.png')}
					/>
					<View
						style={{
							marginVertical: 10,
						}}>
						<Text>Licences</Text>
					</View>
				</Pressable>
				<View style={styles.verticalDivider} />
				<Pressable
					style={styles.rightContent}
					onPress={() => router.push('/cpdhome')}>
					<Icon
						size={usableWidth * 0.6}
						source={require('../../assets/images/nurse.png')}
					/>
					<View
						style={{
							marginVertical: 10,
						}}>
						<Text>CPDs</Text>
					</View>
				</Pressable>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	box: {
		flexDirection: 'row',
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
		justifyContent: 'space-around',
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

export default PractitionersModule;
