import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import Pdf from 'react-native-pdf';
import globalStyles from '../../../styles/global';
import {ActivityIndicator} from 'react-native-paper';
import {primaryColor} from '../../../constants/Colors';

const APMView = () => {
	const source = require('../library/APM Scope of Practice.pdf');

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

export default APMView;
