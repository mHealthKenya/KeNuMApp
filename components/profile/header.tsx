import { Image } from 'expo-image';
import React, { FC, useState } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import { primaryColor } from '../../constants/Colors';
import { User } from '../../models/user';
import globalStyles from '../../styles/global';

const ProfileHeader: FC<{
	user: User | null;
	backgroundColor: string;
	textColor: string;
}> = ({ user, backgroundColor, textColor }) => {
	const { height, width } = useWindowDimensions();

	const dimension = Math.min(width, height);

	const availableWidth = dimension - 30;

	const usableWidth = (availableWidth - 20) / 3;

	const [imageError, setImageError] = useState(false);

	const toggleImageError = () => {
		setImageError((imageError) => !imageError);
	};

	const blurhash = 'LSLE1vRj^-xu^,bFE0jb_4t7?]NF';

	return (
		<View
			style={[
				styles.center,

				{
					width: '100%',
					borderBottomEndRadius: 15,
					height: height * 0.3,
					backgroundColor,
				},
			]}>
			<View>
				{imageError ? (
					<View
						style={[
							globalStyles.column,
							globalStyles.center,
							{
								gap: 10,
							},
						]}>
						<Avatar.Icon
							icon='cloud-upload-outline'
							size={usableWidth * 0.7}
							style={globalStyles.clearAvatar}
						/>
						<Button mode='contained' icon='upload' style={styles.button}>
							Upload Profile Photo
						</Button>
					</View>
				) : (
					<Image
						source={{ uri: user?.ProfilePic }}
						placeholder={blurhash}
						transition={1000}
						onError={toggleImageError}
						style={{
							width: usableWidth * 1.2,
							height: usableWidth * 1.2,
							borderRadius: (usableWidth * 1.2) / 2,
						}}
					/>
				)}
			</View>
			<View style={{ marginTop: 10 }}>
				<Text style={[styles.titleText, { color: textColor }]}>
					{user?.Name}
				</Text>
			</View>
		</View>
	);
};

export default ProfileHeader;

const styles = StyleSheet.create({
	center: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	titleText: {
		textAlign: 'center',
		fontSize: 24,
		textTransform: 'capitalize',
	},

	button: {
		borderRadius: 8,
		backgroundColor: primaryColor,
	},
});
