import React from 'react';
import {ScrollView, View} from 'react-native';
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

	if (isLoading) {
		return (
			<View style={[globalStyles.container, globalStyles.center]}>
				<ActivityIndicator size='large' color={primaryColor} />
			</View>
		);
	}

	return (
		<ScrollView style={{flex: 1}}>
			<ProfileHeader user={data} backgroundColor='#0445b5' textColor='#FFF' buttonColor='#FFF' buttonTextColor='#0445b5' />
			<View className='flex'>
				{profileItems.map((item, index) => (
					<View key={index}>
						<ProfileItem title={item.title} path={item.path} />
						{index !== profileItems.length - 1 && <Divider />}
					</View>
				))}
			</View>
		</ScrollView>
	);
};

export default ProfileComponent;
