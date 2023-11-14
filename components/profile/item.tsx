import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { List } from 'react-native-paper';
import { useRouter } from 'expo-router';

const ProfileItem: FC<{ title: string; path: any }> = ({ title, path }) => {
	const router = useRouter();
	return (
		<Pressable
			style={{
				margin: 5,
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

const styles = StyleSheet.create({});
