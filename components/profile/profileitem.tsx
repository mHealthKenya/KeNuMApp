import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider, Icon } from 'react-native-paper';
import globalStyles from '../../styles/global';
import { Text } from '../Themed';

const ProfileItem: FC<{ title: string; content?: string; icon?: string }> = ({
	title,
	content,
	icon,
}) => {
	return (
		<View>
			<View
				style={[
					globalStyles.column,
					{
						justifyContent: 'space-between',
						padding: 20,
						gap: 10,
					},
				]}>
				<View>
					<View>
						<View style={globalStyles.row}>
							<Icon source={icon} size={30} />
							<Text style={styles.headerText}>{title}</Text>
						</View>
					</View>
				</View>
				<View>
					<View>
						<Text style={styles.contentText}>{content}</Text>
					</View>
				</View>
			</View>
			<Divider />
		</View>
	);
};

export default ProfileItem;

const styles = StyleSheet.create({
	contentText: {
		color: '#0445b5',
		fontSize: 16,
		textTransform: 'capitalize',
	},

	headerText: {
		color: '#959595',
		fontWeight: 'bold',
		fontSize: 14,
	},
});
