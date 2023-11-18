import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { InternshipArea } from '../../../models/internshipareas';
import globalStyles from '../../../styles/global';
import InternshipAreaBox from './internshipareasbox';

const InternshipAreasComponent: FC<{ areas: InternshipArea[] }> = ({
	areas,
}) => {
	return (
		<View style={globalStyles.container}>
			<FlatList
				data={areas}
				renderItem={({ item }) => (
					<InternshipAreaBox
						item={{
							title: item.internship_area,
							id: item.internship_area_id,
						}}
					/>
				)}
				keyExtractor={(item) => item.internship_area_id}
			/>
		</View>
	);
};

export default InternshipAreasComponent;

const styles = StyleSheet.create({});
