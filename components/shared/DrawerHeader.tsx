import {Image} from 'expo-image';
import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import {Avatar, Button} from 'react-native-paper';
import {primaryColor} from '../../constants/Colors';
import {useAuth} from '../../providers/auth';
import globalStyles from '../../styles/global';
import {useRouter} from 'expo-router';
import useAuthenticatedUser from '../../services/auth/authenticated';

const DrawerHeader = () => {
	const {height, width} = useWindowDimensions();

	const dimension = Math.min(width, height);

	const availableWidth = dimension - 30;

	const usableWidth = (availableWidth - 20) / 3;
	const {user, logout} = useAuth();

	const {data, isPending} = useAuthenticatedUser();

	const [imageError, setImageError] = useState(false);

	const toggleImageError = () => {
		setImageError((imageError) => !imageError);
	};

	const router = useRouter();

	const blurhash = 'LSLE1vRj^-xu^,bFE0jb_4t7?]NF';
	return (
		<View
			style={[
				styles.box,
				{
					width: '100%',
					height: height * 0.3,
					borderBottomRightRadius: 10,
				},
			]}>
			{imageError && !isPending ? (
				<View
					style={[
						globalStyles.column,
						globalStyles.center,
						{
							gap: 10,
						},
					]}>
					<Button mode='contained' icon='upload' style={styles.button} onPress={() => router.push('/profile')}>
						<Text style={styles.buttonText}>Upload Profile</Text>
					</Button>
				</View>
			) : (
				<Pressable onPress={() => router.push('/profile')}>
					{!isPending ? (
						<Image
							source={{uri: data?.ProfilePic}}
							placeholder={blurhash}
							transition={1000}
							onError={toggleImageError}
							style={{
								width: usableWidth * 1.2,
								height: usableWidth * 1.2,
								borderRadius: (usableWidth * 1.2) / 2,
							}}
						/>
					) : (
						<Avatar.Icon icon='cloud-upload-outline' size={usableWidth * 0.7} style={globalStyles.clearAvatar} />
					)}
				</Pressable>
			)}
			<View style={{marginTop: 10}}>
				<Text style={styles.nameText}>{user?.Name}</Text>
			</View>
		</View>
	);
};

export default DrawerHeader;

const styles = StyleSheet.create({
	box: {
		backgroundColor: '#0445b5',
		justifyContent: 'center',
		alignItems: 'center',
	},

	button: {
		borderRadius: 8,
		backgroundColor: '#FFFF',
	},

	buttonText: {
		color: primaryColor,
	},

	nameText: {
		color: '#FFF',
		textTransform: 'capitalize',
		fontSize: 18,
	},
});
