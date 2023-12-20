import React, { FC } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { User } from '../../models/user';
import WarnAlert from '../shared/WarnAlert';
import EducationItem from './educationitem';
import ProfileHeader from './header';

const EducationComponent: FC<{ user: User | undefined }> = ({ user }) => {
	return (
		<ScrollView style={styles.container}>
			<ProfileHeader
				user={user}
				backgroundColor='#eaf2fa'
				textColor='#0445b5'
			/>

			{user?.education?.length === 0 ? (
				<WarnAlert message='No previous education records could be found in your account' />
			) : (
				user?.education?.map((item, index) => (
					<View key={index} style={{ marginHorizontal: 10 }}>
						<EducationItem education={item} />
					</View>
				))
			)}
		</ScrollView>
	);
};

export default EducationComponent;

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
