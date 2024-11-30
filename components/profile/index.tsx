import React from 'react';
import {ScrollView, View, useWindowDimensions} from 'react-native';
import {ActivityIndicator, Divider} from 'react-native-paper';
import {primaryColor} from '../../constants/Colors';
import useAuthenticatedUser from '../../services/auth/authenticated';
import globalStyles from '../../styles/global';
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
	const {data, isLoading} = useAuthenticatedUser();

	const {height} = useWindowDimensions();

	if (isLoading) {
		return (
			<View style={[globalStyles.container, globalStyles.center]}>
				<ActivityIndicator size='large' color={primaryColor} />
			</View>
		);
	}

	return (
		<View style={{flex: 1}}>
			<ScrollView style={{flex: 1}}>
				<ProfileHeader
					user={data}
					backgroundColor='#0445b5'
					textColor='#FFF'
					buttonColor='#FFF'
					buttonTextColor='#0445b5'
				/>
				<View
					style={[
						{
							height: height * 0.5,
							flex: 1,
							marginTop: 5,
							justifyContent: 'space-evenly',
						},
					]}>
					{profileItems.map((item, index) => (
						<View key={index}>
							<ProfileItem title={item.title} path={item.path} />
							{index !== profileItems.length - 1 && <Divider />}
						</View>
					))}
				</View>
			</ScrollView>
		</View>
	);
};

export default ProfileComponent;
