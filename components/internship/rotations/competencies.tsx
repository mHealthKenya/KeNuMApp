import {FlashList} from '@shopify/flash-list';
import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useFetchedCompetencies} from '../../../providers/rotationcompetencies';
import globalStyles from '../../../styles/global';
import RotationCompetencyBox from './rotationcompetenciesbox';
import {Searchbar} from 'react-native-paper';
import {useSearch} from '../../../providers/search';

const CompetenciesComponent = () => {
	const {competencies} = useFetchedCompetencies();

	const {search, handleSearch} = useSearch();

	const filtered = useMemo(
		() =>
			competencies?.rotation_competencies.filter((item) => item.competency.toLowerCase().includes(search.toLowerCase())),
		[competencies, search]
	);

	return (
		<View style={globalStyles.container}>
			<Searchbar placeholder='Search for competency' onChangeText={handleSearch} value={search} style={styles.searchBar} />
			<FlashList
				data={filtered || []}
				estimatedItemSize={150}
				renderItem={({item}) => <RotationCompetencyBox competency={item} />}
			/>
		</View>
	);
};

export default CompetenciesComponent;

const styles = StyleSheet.create({
	searchBar: {
		backgroundColor: '#dbe6f5',
		margin: 5,
		padding: 2,
		borderRadius: 10,
	},
});
