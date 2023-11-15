import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import globalStyles from '../../styles/global';
import { Divider } from 'react-native-paper';

interface Education {
	cadre_text?: string;
	institution?: string;
	admission_date?: string | Date | undefined;
}

interface Registration {
	reg_no?: string;
	cadre_text?: string;
}

const RegistrationItem: FC<{
	registration: Registration;
}> = ({ registration }) => {
	return (
		<View style={styles.card}>
			<View style={[globalStyles.column]}>
				<View style={[globalStyles.column, { gap: 10, padding: 20 }]}>
					<Text style={styles.headerText}>Cadre</Text>
					<Text style={styles.contentText}>{registration?.cadre_text}</Text>
				</View>
				<Divider />
				<View style={[globalStyles.column, { gap: 10, padding: 20 }]}>
					<Text style={styles.headerText}>Registration Number</Text>
					<Text style={styles.contentText}>{registration?.reg_no}</Text>
				</View>
				<Divider />
			</View>
		</View>
	);
};

export default RegistrationItem;

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
