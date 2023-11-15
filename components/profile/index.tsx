import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { Divider } from 'react-native-paper';
import { primaryColor } from '../../constants/Colors';
import { useAuth } from '../../providers/auth';
import ProfileHeader from './header';
import ProfileItem from './item';

interface Profile {
	title: string;
	path: any;
}

const profileItems: Profile[] = [
	{
		title: 'Bio Data',
		path: '/general',
	},
	{
		title: 'Education',
		path: '/education',
	},

	{
		title: 'Registration',
		path: '/registration',
	},

	{
		title: 'License',
		path: '/licence',
	},

	{
		title: 'CPDs',
		path: '/cpds',
	},
];

const ProfileComponent = () => {
	const { user } = useAuth();

	const { height } = useWindowDimensions();

	return (
		<View style={{ flex: 1 }}>
			<ProfileHeader user={user} backgroundColor='#0445b5' textColor='#FFF' />
			<View
				style={[
					{
						height: height * 0.5,
						flex: 1,
						marginTop: 5,
					},
				]}>
				{profileItems.map((item, index) => (
					<View key={index}>
						<ProfileItem title={item.title} path={item.path} />
						{index !== profileItems.length - 1 && <Divider />}
					</View>
				))}
			</View>
		</View>
	);
};

export default ProfileComponent;

const styles = StyleSheet.create({
	center: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	titleText: {
		textAlign: 'center',
		fontSize: 24,
		textTransform: 'capitalize',
		color: '#FFF',
	},

	button: {
		borderRadius: 8,
		backgroundColor: primaryColor,
	},
});
