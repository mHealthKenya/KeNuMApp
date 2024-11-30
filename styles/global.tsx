import {StyleSheet} from 'react-native';

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

	onlyAvatar: {
		backgroundColor: '#f0f6fb',
	},

	center: {
		justifyContent: 'center',
		alignItems: 'center',
	},

	clearAvatar: {
		backgroundColor: '#f0f6fb',
	},
});

export default globalStyles;
