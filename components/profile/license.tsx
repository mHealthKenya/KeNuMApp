import React, { FC } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { User } from '../../models/user';
import ProfileHeader from './header';
import LicenseItem from './licenceitem';

const LicenseComponent: FC<{ user: User | null }> = ({ user }) => {
	return (
		<ScrollView style={styles.container}>
			<ProfileHeader
				user={user}
				backgroundColor='#eaf2fa'
				textColor='#0445b5'
			/>
			{user?.license?.map((item, index) => (
				<View key={index} style={{ marginHorizontal: 10 }}>
					<LicenseItem license={item} />
				</View>
			))}
		</ScrollView>
	);
};

export default LicenseComponent;

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
