import {Href, useRouter} from 'expo-router';
import React, {FC} from 'react';
import {Pressable} from 'react-native';
import {List} from 'react-native-paper';
import {useAuth} from '../../providers/auth';

const ProfileItem: FC<{title: string; path?: Href; auth?: boolean}> = ({title, path, auth}) => {
	const router = useRouter();

	const {logout} = useAuth();

	if (auth) {
		return (
			<Pressable
				style={{
					margin: 5,
					padding: 20,
				}}
				onPress={() => logout()}>
				<List.Item title={title} right={(props) => <List.Icon {...props} icon='chevron-right' />} />
			</Pressable>
		);
	}

	return (
		<Pressable
			style={{
				margin: 5,
				padding: 20,
			}}
			onPress={() => router.push(path ? path : '/login')}>
			<List.Item title={title} right={(props) => <List.Icon {...props} icon='chevron-right' />} />
		</Pressable>
	);
};

export default ProfileItem;
