import {FlashList} from '@shopify/flash-list';
import React, {FC} from 'react';
import {View} from 'react-native';
import {InternshipArea} from '../../../models/internshipareas';
import globalStyles from '../../../styles/global';
import InternshipAreaBox from './internshipareasbox';

const InternshipAreasComponent: FC<{areas: InternshipArea[]}> = ({areas}) => {
	return (
		<View style={globalStyles.container}>
			<FlashList
				data={areas}
				renderItem={({item}) => (
					<InternshipAreaBox
						item={{
							title: item.internship_area,
							id: item.internship_area_id,
						}}
					/>
				)}
				estimatedItemSize={150}
				keyExtractor={(item) => item.internship_area_id}
			/>
		</View>
	);
};

export default InternshipAreasComponent;
