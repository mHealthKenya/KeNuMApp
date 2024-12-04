import React, {FC} from 'react';
import {ScrollView, View} from 'react-native';
import {User} from '../../models/user';
import ProfileHeader from './header';
import ProfileItem from './profileitem';

const BioData: FC<{user: User | undefined}> = ({user}) => {
	return (
		<ScrollView className='flex flex-1'>
			<ProfileHeader user={user} backgroundColor='#eaf2fa' textColor='#0445b5' />
			<View className='m-2'>
				<View className='p-2 bg-[#FFFFFF] rounded-xl'>
					<ProfileItem title='ID Number' content={user?.IdNumber} />
					<ProfileItem title='Index Number' content={user?.IndexNo} />
					<ProfileItem title='Gender' content={user?.Gender?.startsWith('M') ? 'Male' : 'Female'} />
					<ProfileItem title='Email' content={user?.Email} />
					<ProfileItem title='Mobile Number' content={user?.MobileNo} />
					<ProfileItem title='Address' content={user?.Address} />
				</View>
			</View>
		</ScrollView>
	);
};

export default BioData;
