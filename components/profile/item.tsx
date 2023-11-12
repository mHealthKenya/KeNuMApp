import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { List } from 'react-native-paper';

const ProfileItem: FC<{ title: string }> = ({ title }) => {
	return (
		<List.Item
			title={title}
			right={(props) => <List.Icon {...props} icon='chevron-right' />}
		/>
	);
};

export default ProfileItem;

const styles = StyleSheet.create({});
