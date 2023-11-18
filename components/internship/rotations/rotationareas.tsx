import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useFetchedRotationAreas } from '../../../providers/rotationareas';
import globalStyles from '../../../styles/global';
import { FlatList } from 'react-native';
import RotationAreaBox from './rotationareabox';

const RotationAreasComponent = () => {
	const { areas } = useFetchedRotationAreas();
	return (
		<View style={globalStyles.container}>
			<FlatList
				data={areas?.rotation_areas || []}
				renderItem={({ item }) => <RotationAreaBox area={item} />}
			/>
		</View>
	);
};

export default RotationAreasComponent;

const styles = StyleSheet.create({});
