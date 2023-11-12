import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
	container: {
		backgroundColor: '#f0f6fb',
		flex: 1,
	},

	column: {
		flexDirection: 'column',
	},

	row: {
		flexDirection: 'row',
	},

	blankAvatar: {
		backgroundColor: '#FFF',
	},

	center: {
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default globalStyles;
