import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { User } from '../../models/user';
import globalStyles from '../../styles/global';
import ProfileHeader from './header';

const CPDsComponent: FC<{ user: User | undefined }> = ({ user }) => {
	return (
		<View style={styles.container}>
			<ProfileHeader
				user={user}
				backgroundColor='#eaf2fa'
				textColor='#0445b5'
			/>
			<View style={[{ marginHorizontal: 10 }, styles.card]}>
				{user?.cpd?.map((item, index) => (
					<View style={[globalStyles.column]} key={index}>
						<View style={[globalStyles.column, { gap: 10, padding: 20 }]}>
							<Text style={styles.headerText}>Required Points</Text>
							<Text style={styles.contentText}>{item?.cpd_requirement}</Text>
						</View>
						<Divider />
						<View style={[globalStyles.column, { gap: 10, padding: 20 }]}>
							<Text style={styles.headerText}>Current Points</Text>
							<Text style={styles.contentText}>{item?.current_points}</Text>
						</View>
					</View>
				))}
			</View>
		</View>
	);
};

export default CPDsComponent;

const styles = StyleSheet.create({
	card: {
		backgroundColor: 'white',
		borderRadius: 5,
		padding: 16,
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.3,
		shadowRadius: 6,
		elevation: 14,
		flex: 1,
		marginBottom: 40,
	},

	container: {
		backgroundColor: '#eaf2fa',
		flex: 1,
	},
	spacer: {
		marginVertical: 20,
		marginHorizontal: 10,
		flex: 1,
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
