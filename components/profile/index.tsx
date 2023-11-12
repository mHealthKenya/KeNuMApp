import React from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useAuth } from '../../providers/auth';
import globalStyles from '../../styles/global';
import { Image } from 'expo-image';
import ProfileItem from './item';
import { Divider } from 'react-native-paper';

interface Profile {
	title: string;
}

const profileItems: Profile[] = [
	{
		title: 'Bio Data',
	},
	{
		title: 'Education',
	},

	{
		title: 'Registration',
	},

	{
		title: 'License',
	},

	{
		title: 'CPDs',
	},
];

const ProfileComponent = () => {
	const { user } = useAuth();

	const blurhash = 'LSLE1vRj^-xu^,bFE0jb_4t7?]NF';
	const { height, width } = useWindowDimensions();

	const dimension = Math.min(width, height);

	const availableWidth = dimension - 30;

	const usableWidth = (availableWidth - 20) / 3;
	return (
		<View style={{ flex: 1 }}>
			<View
				style={[
					globalStyles.center,
					{
						width: '100%',
						height: height * 0.3,
					},
				]}>
				<Image
					source={{ uri: user?.ProfilePic }}
					placeholder={blurhash}
					transition={1000}
					style={{
						width: usableWidth * 1.5,
						height: usableWidth * 1.5,
						borderRadius: (usableWidth * 1.5) / 2,
					}}
				/>
			</View>
			<View
				style={[
					{
						height: height * 0.1,
					},
				]}>
				<Text style={styles.titleText}>{user?.Name}</Text>
			</View>

			<View
				style={[
					{
						height: height * 0.5,
						flex: 1,
					},
				]}>
				{profileItems.map((item, index) => (
					<View key={index}>
						<ProfileItem title={item.title} />
						{index !== profileItems.length - 1 && <Divider />}
					</View>
				))}
			</View>
		</View>
	);
};

export default ProfileComponent;

const styles = StyleSheet.create({
	titleText: {
		textAlign: 'center',
		fontSize: 24,
		textTransform: 'capitalize',
	},
});
