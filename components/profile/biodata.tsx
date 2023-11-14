import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { User } from '../../models/user';
import globalStyles from '../../styles/global';
import ProfileItem from './profileitem';

const BioData: FC<{ user: User | null }> = ({ user }) => {
	return (
		<View style={globalStyles.container}>
			<View style={styles.spacer}>
				<View style={styles.card}>
					<ProfileItem title='Index No' content={user?.IndexNo} />
					<ProfileItem title='Email' content={user?.Email} />
					<ProfileItem title='Email' content={user?.Email} />
					<ProfileItem title='Email' content={user?.Email} />
					<ProfileItem title='Email' content={user?.Email} />
					<ProfileItem title='Email' content={user?.Email} />
					<ProfileItem title='Email' content={user?.Email} />
					<ProfileItem title='Email' content={user?.Email} />
				</View>
			</View>
		</View>
	);
};

export default BioData;

const styles = StyleSheet.create({
	spacer: {
		marginVertical: 20,
        marginHorizontal: 10,
		flex: 1,
	},
	card: {
		flex: 1,
		backgroundColor: 'white',
		borderRadius: 15,
		padding: 16,
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.3,
		shadowRadius: 6,
		elevation: 14,
		justifyContent: 'space-evenly',
	},
});
