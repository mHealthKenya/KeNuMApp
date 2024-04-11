import {useRouter} from 'expo-router';
import React, {FC} from 'react';
import {Pressable} from 'react-native';
import {Icon} from 'react-native-paper';
import {useSearch} from '../../providers/search';

const ProfileHeaderLeft: FC<{color?: string}> = ({color}) => {
	const {handleSearch} = useSearch();
	const router = useRouter();

	const handlePress = () => {
		handleSearch('');
		router.back();
	};

	return (
		<Pressable
			onPress={handlePress}
			style={{
				justifyContent: 'center',
			}}>
			<Icon source='arrow-left' size={30} color={color || '#FFF'} />
		</Pressable>
	);
};

export default ProfileHeaderLeft;
