import React from 'react';
import { StyleSheet, View } from 'react-native';
import globalStyles from '../../styles/global';
import GeneralModule from './general';
import PractitionersModule from './practitioner';
import StudentsModule from './students';

const HomeComponent = () => {
	return (
		<View
			style={[
				globalStyles.container,
				{
					justifyContent: 'space-evenly',
				},
			]}>
			<StudentsModule />
			<PractitionersModule />
			<GeneralModule />
		</View>
	);
};

export default HomeComponent;

const styles = StyleSheet.create({});
