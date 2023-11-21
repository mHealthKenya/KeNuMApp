import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useFetchedRotationAreas } from '../../../providers/rotationareas';
import globalStyles from '../../../styles/global';
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
