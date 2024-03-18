import {FlashList} from '@shopify/flash-list';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useFetchedRotationAreas} from '../../../providers/rotationareas';
import globalStyles from '../../../styles/global';
import RotationAreaBox from './rotationareabox';

const RotationAreasComponent = () => {
	const {areas} = useFetchedRotationAreas();
	return (
		<View style={globalStyles.container}>
			<FlashList
				data={areas?.rotation_areas || []}
				estimatedItemSize={150}
				renderItem={({item}) => <RotationAreaBox area={item} />}
			/>
		</View>
	);
};

export default RotationAreasComponent;

const styles = StyleSheet.create({});
