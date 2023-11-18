import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import globalStyles from '../../../styles/global';
import { useFetchedCompetencies } from '../../../providers/rotationcompetencies';
import RotationCompetencyBox from './rotationcompetenciesbox';

const CompetenciesComponent = () => {
	const { competencies } = useFetchedCompetencies();
	return (
		<View style={globalStyles.container}>
			<FlatList
				data={competencies?.rotation_competencies || []}
				renderItem={({ item }) => <RotationCompetencyBox competency={item} />}
			/>
		</View>
	);
};

export default CompetenciesComponent;

const styles = StyleSheet.create({});
