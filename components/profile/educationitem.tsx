import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Divider} from 'react-native-paper';
import globalStyles from '../../styles/global';

interface Education {
	cadre_text?: string;
	institution?: string;
	admission_date?: string | Date | undefined;
}

const EducationItem: FC<{
	education: Education;
}> = ({education}) => {
	return (
		<View style={styles.card}>
			<View style={[globalStyles.column]}>
				<View style={[globalStyles.column, {gap: 10, padding: 20}]}>
					<Text style={styles.headerText}>Cadre</Text>
					<Text style={styles.contentText}>{education?.cadre_text}</Text>
				</View>
				<Divider />
				<View style={[globalStyles.column, {gap: 10, padding: 20}]}>
					<Text style={styles.headerText}>Institution</Text>
					<Text style={styles.contentText}>{education?.institution}</Text>
				</View>
				<Divider />
				<View style={[globalStyles.column, {gap: 10, padding: 20}]}>
					<Text style={styles.headerText}>Commence Date</Text>
					<Text style={styles.contentText}>{education?.admission_date?.toLocaleString()}</Text>
				</View>
			</View>
		</View>
	);
};

export default EducationItem;

const styles = StyleSheet.create({
	card: {
		backgroundColor: 'white',
		borderRadius: 5,
		padding: 16,
		shadowColor: '#eaf2fa',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.3,
		shadowRadius: 6,
		elevation: 14,
		marginVertical: 5,
	},

	contentText: {
		color: '#0445b5',
		fontSize: 16,
		textTransform: 'capitalize',
	},

	headerText: {
		color: '#959595',
		fontWeight: 'bold',
		fontSize: 14,
	},
});
