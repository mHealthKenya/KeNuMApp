import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';
import { Icon } from 'react-native-paper';

const ProfileHeaderLeft = () => {
	const router = useRouter();
	return (
		<Pressable
			onPress={() => router.back()}
			style={{
				justifyContent: 'center',
			}}>
			<Icon source='arrow-left' size={30} color='#FFF' />
		</Pressable>
	);
};

export default ProfileHeaderLeft;
