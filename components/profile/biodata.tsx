import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { User } from '../../models/user';
import ProfileHeader from './header';
import ProfileItem from './profileitem';

const BioData: FC<{ user: User | null }> = ({ user }) => {
	return (
		<View style={styles.container}>
			<ProfileHeader
				user={user}
				backgroundColor='#eaf2fa'
				textColor='#0445b5'
			/>
			<View style={styles.spacer}>
				<View style={styles.card}>
					<ProfileItem title='ID Number' content={user?.IdNumber} />
					<ProfileItem title='Index Number' content={user?.IndexNo} />
					<ProfileItem
						title='Gender'
						content={user?.Gender?.startsWith('M') ? 'Male' : 'Female'}
					/>
					<ProfileItem title='Email' content={user?.Email} />
					<ProfileItem title='Mobile Number' content={user?.MobileNo} />
					<ProfileItem title='Address' content={user?.Address} />
				</View>
			</View>
		</View>
	);
};

export default BioData;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#eaf2fa',
		flex: 1,
	},
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
