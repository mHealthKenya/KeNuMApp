import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import React, { FC } from 'react';
import globalStyles from '../../styles/global';
import { Icon } from 'react-native-paper';

const ProfileItem: FC<{ title: string; content?: string; icon?: string }> = ({
	title,
	content,
	icon,
}) => {
	const { height, width } = useWindowDimensions();

	const dimension = Math.min(width, height);

	const availableWidth = dimension - 20;
	return (
		<View
			style={[
				globalStyles.row,
				{
					justifyContent: 'space-between',
				},
			]}>
			<View
				style={[
					{
						width: availableWidth * (1 / 3),
					},
				]}>
				<View style={styles.content}>
					<View style={globalStyles.row}>
						<Icon source={icon} size={30} />
						<Text>{title}</Text>
					</View>
				</View>
			</View>
			<View
				style={[
					{
						width: availableWidth * (2 / 3),
					},
				]}>
				<View style={styles.content}>
					<Text>{content}</Text>
				</View>
			</View>
		</View>
	);
};

export default ProfileItem;

const styles = StyleSheet.create({
	content: {
		padding: 10,
	},
});
