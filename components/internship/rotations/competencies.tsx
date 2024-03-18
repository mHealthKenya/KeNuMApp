import {FlashList} from '@shopify/flash-list';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useFetchedCompetencies} from '../../../providers/rotationcompetencies';
import globalStyles from '../../../styles/global';
import RotationCompetencyBox from './rotationcompetenciesbox';

const CompetenciesComponent = () => {
	const {competencies} = useFetchedCompetencies();
	return (
		<View style={globalStyles.container}>
			<FlashList
				data={competencies?.rotation_competencies || []}
				estimatedItemSize={150}
				renderItem={({item}) => <RotationCompetencyBox competency={item} />}
			/>
		</View>
	);
};

export default CompetenciesComponent;

const styles = StyleSheet.create({});
