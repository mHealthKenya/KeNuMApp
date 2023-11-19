import dayjs from 'dayjs';
import React, { FC } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { ExamResult } from '../../models/results';
import globalStyles from '../../styles/global';

const ResultBox: FC<{ result: ExamResult }> = ({ result }) => {
	return (
		<View style={styles.card}>
			<View style={{ padding: 10 }}>
				<View style={[globalStyles.column, { gap: 10 }]}>
					<Text style={styles.mutedText}>Name</Text>
					<Text style={styles.titleText}>{result.full_name}</Text>
					<Divider />
				</View>
			</View>
			<View style={{ padding: 10 }}>
				<View style={[globalStyles.column, { gap: 10 }]}>
					<Text style={styles.mutedText}>Series</Text>
					<Text style={styles.titleText}>{result.series}</Text>
					<Divider />
				</View>
			</View>

			<View style={{ padding: 10 }}>
				<View style={[globalStyles.column, { gap: 10 }]}>
					<Text style={styles.mutedText}>Training Institution</Text>
					<Text style={styles.titleText}>{result.training_institution}</Text>
					<Divider />
				</View>
			</View>

			<View style={{ padding: 10 }}>
				<View style={[globalStyles.column, { gap: 10 }]}>
					<Text style={styles.mutedText}>Cadre</Text>
					<Text style={styles.titleText}>{result.cadre}</Text>
					<Divider />
				</View>
			</View>

			<View style={{ padding: 10 }}>
				<View style={[globalStyles.column, { gap: 10 }]}>
					<Text style={styles.mutedText}>Grading Method</Text>
					<Text style={styles.titleText}>{result.grading_method}</Text>
					<Divider />
				</View>
			</View>

			<View style={{ padding: 10 }}>
				<View style={[globalStyles.column, { gap: 10 }]}>
					<Text style={styles.mutedText}>Score Paper One</Text>
					<Text style={styles.titleText}>{result.score_paper_one}</Text>
				</View>
			</View>

			<View style={{ padding: 10 }}>
				<View style={[globalStyles.column, { gap: 10 }]}>
					<Text style={styles.mutedText}>Score Paper Two</Text>
					<Text style={styles.titleText}>{result.score_paper_two}</Text>
				</View>
			</View>
		</View>
	);
};

const ExamResultsComponent: FC<{
	results: ExamResult[];
	refresh: () => {};
	isRefetching: boolean;
}> = ({ results, refresh, isRefetching }) => {
	return (
		<View style={globalStyles.container}>
			<FlatList
				data={results}
				renderItem={({ item }) => <ResultBox result={item} />}
				keyExtractor={(item, index) => '' + index}
				onRefresh={refresh}
				refreshing={isRefetching}
			/>
		</View>
	);
};

export default ExamResultsComponent;

const styles = StyleSheet.create({
	card: {
		backgroundColor: '#FFF',
		borderRadius: 10,
		padding: 10,
		shadowColor: '#dcf0fa',
		shadowOffset: {
			width: 0,
			height: 10,
		},
		shadowOpacity: 0.9,
		shadowRadius: 6,
		elevation: 14,
		margin: 10,
	},

	mutedText: {
		color: '#4e4e4e',
		fontSize: 14,
		letterSpacing: 1.5,
		textTransform: 'capitalize',
	},

	titleText: {
		color: '#3f51b5',
		fontSize: 16,
		letterSpacing: 2,
		textTransform: 'capitalize',
	},
});
