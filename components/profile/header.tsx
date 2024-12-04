import {Image} from 'expo-image';
import {useRouter} from 'expo-router';
import React, {FC, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, Button} from 'react-native-paper';
import {primaryColor} from '../../constants/Colors';
import {User} from '../../models/user';
import globalStyles from '../../styles/global';
import {Text} from '../Themed';

const ProfileHeader: FC<{
	user: User | undefined;
	backgroundColor: string;
	textColor: string;
	buttonColor?: string;
	buttonTextColor?: string;
	hideButton?: boolean;
}> = ({user, backgroundColor, textColor, buttonColor, buttonTextColor, hideButton}) => {
	const [imageError, setImageError] = useState(false);

	const toggleImageError = () => {
		setImageError((imageError) => !imageError);
	};

	const blurhash = 'LSLE1vRj^-xu^,bFE0jb_4t7?]NF';

	const router = useRouter();

	const handleEdit = () => {
		router.push('/updateprofile');
	};

	return (
		<View className={`flex flex-1 justify-center items-center bg-[${backgroundColor}]`}>
			<View>
				{imageError ? (
					<View className='flex flex-col gap-2'>
						<Avatar.Icon icon='cloud-upload-outline' size={20} style={globalStyles.clearAvatar} />

						{!hideButton && (
							<Button
								mode='contained'
								icon='upload'
								onPress={handleEdit}
								style={[
									styles.button,
									{
										backgroundColor: buttonColor || primaryColor,
									},
								]}>
								<Text style={{color: buttonTextColor || '#FFF'}}>Edit Profile</Text>
							</Button>
						)}
					</View>
				) : (
					<View className='flex flex-col gap-6 items-center justify-center py-4'>
						<Image
							source={{uri: user?.ProfilePic}}
							placeholder={blurhash}
							transition={1000}
							onError={toggleImageError}
							style={{
								width: 100,
								height: 100,
								borderRadius: 50,
							}}
						/>
						{!hideButton && (
							<Button
								mode='contained'
								icon='upload'
								style={[
									styles.button,
									{
										backgroundColor: buttonColor || primaryColor,
									},
								]}
								onPress={handleEdit}>
								<Text style={{color: buttonTextColor || '#FFF'}}>Edit Profile </Text>
							</Button>
						)}
					</View>
				)}
			</View>
			<View className='py-4'>
				<Text style={[styles.titleText, {color: textColor}]}>{user?.Name}</Text>
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
	},
});
