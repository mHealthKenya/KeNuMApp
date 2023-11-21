import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useFetchedCompetencies } from '../../../providers/rotationcompetencies';
import globalStyles from '../../../styles/global';
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
