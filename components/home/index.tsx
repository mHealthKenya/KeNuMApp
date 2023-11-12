import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useAuth } from '../../providers/auth';
import globalStyles from '../../styles/global';
import StudentsModule from './students';
import PractitionersModule from './practitioner';
import GeneralModule from './general';

const HomeComponent = () => {
	const { logout, user } = useAuth();
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
