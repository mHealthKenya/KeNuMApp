import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import globalStyles from '../../styles/global';
import { Divider } from 'react-native-paper';

interface License {
	license_no?: string;
	from_date?: string | Date;
	to_date?: string | Date;
	workStation?: string | null;
}

const LicenseItem: FC<{
	license: License;
}> = ({ license }) => {
	return (
		<View style={styles.card}>
			<View style={[globalStyles.column]}>
				<View style={[globalStyles.column, { gap: 10, padding: 20 }]}>
					<Text style={styles.headerText}>License Number</Text>
					<Text style={styles.contentText}>{license?.license_no}</Text>
				</View>
				<Divider />
				<View style={[globalStyles.column, { gap: 10, padding: 20 }]}>
					<Text style={styles.headerText}>From</Text>
					<Text style={styles.contentText}>
						{license?.from_date?.toLocaleString()}
					</Text>
				</View>
				<Divider />
				<View style={[globalStyles.column, { gap: 10, padding: 20 }]}>
					<Text style={styles.headerText}>To Date</Text>
					<Text style={styles.contentText}>
						{license?.to_date?.toLocaleString()}
					</Text>
				</View>
				<Divider />
			</View>
		</View>
	);
};

export default LicenseItem;

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
