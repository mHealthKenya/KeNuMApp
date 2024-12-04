import {Ionicons} from '@expo/vector-icons';
import {Alert, AlertIcon, AlertText, InfoIcon} from '@gluestack-ui/themed';
import {Image} from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import {useRouter} from 'expo-router';
import mime from 'mime';
import React, {useCallback, useEffect, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, TextInput, TextInputProps} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import {primaryColor} from '../../constants/Colors';
import {useAuth} from '../../providers/auth';
import {useError} from '../../providers/error';
import useRegistrationApplication from '../../services/registration/apply';

const RegistrationApplicationComponent = () => {
	interface UserImage {
		uri: string | null;
		name: string;
		type?: string;
	}

	const [image, setImage] = useState<UserImage>();

	const [checked, setChecked] = useState(false);

	const theme = {
		roundness: 10,
	};

	const textProps: TextInputProps = {
		theme,
		style: styles.input,
		outlineColor: '#f9f9f9',
		activeOutlineColor: '#0445b5',
	};

	const pickImage = async (name: string) => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (result.canceled) {
			return;
		}

		if (!result.canceled) {
			const item = {
				uri: 'file:///' + result.assets[0].uri.split('file:/').join(''),
				name,
				type: mime.getType(result.assets[0].uri) || '',
			};

			setImage(item);
		}
	};

	const router = useRouter();

	const successFn = () => {
		router.push('/registrationapplications');
	};

	const {mutate, isPending} = useRegistrationApplication(successFn);

	const {user} = useAuth();

	const handleSubmit = () => {
		if (user?.education !== undefined) {
			const education_id = user?.education[user.education?.length - 1].education_id;
			mutate({
				education_id: education_id || '',
				current_passport: image,
			});
		}
	};

	const {error, clearError} = useError();

	const showToast = useCallback(() => {
		Toast.show({
			type: 'error',
			text1: 'Error',
			text2: error,
			onShow: () => clearError(),
		});
	}, [error, clearError]);

	useEffect(() => {
		if (error) {
			showToast();
		}
	}, [error, showToast]);

	return (
		<ScrollView className='flex flex-1'>
			<View className='flex items-center justify-center'>
				<Image
					source={require('../../assets/images/registration.png')}
					style={{
						width: 200,
						height: 200,
					}}
					contentFit='contain'
				/>
			</View>
			{user?.education === undefined || user?.education?.length < 1 ? (
				<View style={styles.container}>
					<Alert>
						<AlertIcon as={InfoIcon} mr='$3' />
						<AlertText>
							We could not find an eduction registered under your account. Please complete and pass an exam then retry
						</AlertText>
					</Alert>
				</View>
			) : (
				<>
					<View style={[styles.container]}>
						<Pressable onPress={() => pickImage('current_passport')}>
							<TextInput
								label='Current Passport'
								left={<TextInput.Icon icon='account' />}
								right={
									<TextInput.Icon
										onPress={() => pickImage('current_passport')}
										icon={() => (
											<Image
												source={image?.uri}
												style={{
													width: 50,
													height: 50,
												}}
											/>
										)}
									/>
								}
								mode='outlined'
								editable={false}
								onPressIn={() => pickImage('current_passport')}
								{...textProps}
							/>
						</Pressable>
					</View>

					<View className='flex flex-row gap-2 items-center p-2'>
						<Pressable
							role='checkbox'
							aria-checked={checked}
							style={[styles.checkboxBase, checked && styles.checkboxChecked]}
							onPress={() => setChecked(!checked)}>
							{checked && <Ionicons name='checkmark' size={24} color='white' />}
						</Pressable>
						<Text>I confirm that I am fit to practice</Text>
					</View>

					<View style={[styles.container]}>
						<Button
							style={[styles.button, (isPending || !checked) && styles.buttonDisabled]}
							mode='contained'
							loading={isPending}
							onPress={handleSubmit}
							disabled={!checked}>
							Register
						</Button>
					</View>
				</>
			)}
		</ScrollView>
	);
};

export default RegistrationApplicationComponent;

const styles = StyleSheet.create({
	center: {
		justifyContent: 'center',
		alignItems: 'center',
	},

	input: {
		backgroundColor: '#f9f9f9',
	},

	container: {
		padding: 10,
	},

	button: {
		borderRadius: 5,
		backgroundColor: primaryColor,
	},

	checkboxBase: {
		width: 24,
		height: 24,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 4,
		borderWidth: 2,
		borderColor: 'coral',
		backgroundColor: 'transparent',
	},
	checkboxChecked: {
		backgroundColor: 'coral',
	},
	appContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	appTitle: {
		marginVertical: 16,
		fontWeight: 'bold',
		fontSize: 24,
	},
	checkboxContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	checkboxLabel: {
		marginLeft: 8,
		fontWeight: '500',
		fontSize: 18,
	},

	buttonDisabled: {
		backgroundColor: '#A9A9A9', // Disabled button color
	},
});
