import { useRouter } from 'expo-router';
import React, { FC } from 'react';
import { Pressable } from 'react-native';
import { List } from 'react-native-paper';

const ProfileItem: FC<{ title: string; path: any }> = ({ title, path }) => {
	const router = useRouter();
	return (
		<Pressable
			style={{
				margin: 5,
				padding: 20,
			}}
			onPress={() => router.push(path)}>
			<List.Item
				title={title}
				right={(props) => <List.Icon {...props} icon='chevron-right' />}
			/>
		</Pressable>
	);
};

export default ProfileItem;
