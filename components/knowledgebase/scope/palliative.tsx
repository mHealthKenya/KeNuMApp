import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import Pdf from 'react-native-pdf';
import {primaryColor} from '../../../constants/Colors';
import globalStyles from '../../../styles/global';

const PalliativeView = () => {
	const source = require('../library/palliative Scope.pdf');

	return (
		<View className='flex flex-1'>
			<Pdf
				source={source}
				onLoadComplete={(numberOfPages) => {
					console.log(`Number of pages: ${numberOfPages}`);
				}}
				onLoadProgress={() => (
					<View style={[globalStyles.container, globalStyles.center]}>
						<ActivityIndicator size='large' color={primaryColor} />
					</View>
				)}
				style={styles.pdf}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	pdf: {
		flex: 1,
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
	},
});

export default PalliativeView;
