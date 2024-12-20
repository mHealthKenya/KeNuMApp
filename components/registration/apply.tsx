import {Pressable, StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React, {useState} from 'react';
import globalStyles from '../../styles/global';
import {Image} from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import mime from 'mime';
import {Button, TextInput, TextInputProps} from 'react-native-paper';
import {primaryColor} from '../../constants/Colors';
import useRegistrationApplication from '../../services/registration/apply';
import {useAuth} from '../../providers/auth';
import {Alert, AlertIcon, AlertText, useToast} from '@gluestack-ui/themed';
import {InfoIcon} from '@gluestack-ui/themed';
import {useRouter} from 'expo-router';
import ToastError from '../shared/ToastError';
import {useAtom} from 'jotai';
import {errorAtom} from '../../atoms/error';
import {Ionicons} from '@expo/vector-icons';

const RegistrationApplicationComponent = () => {
	interface UserImage {
		uri: string | null;
		name: string;
		type?: string;
	}

	const {width, height} = useWindowDimensions();
	const actualWidth = Math.min(width, height);
	const usableWidth = actualWidth - 20;

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

	const toast = useToast();

	const [error, _] = useAtom(errorAtom);

	const successFn = () => {
		router.push('/registrationapplications');
	};

	const errorFn = () => {
		toast.show({
			onCloseComplete() {},
			duration: 5000,
			render: ({id}) => {
				return <ToastError id={id} title='Application Error' description={error} />;
			},
			placement: 'top',
		});
	};

	const {mutate, isPending} = useRegistrationApplication(successFn, errorFn);

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

	return (
		<View style={globalStyles.container}>
			<View
				style={[
					styles.center,
					{
						height: height * 0.4,
					},
				]}>
				<Image
					source={require('../../assets/images/registration.png')}
					style={{
						width: usableWidth,
						height: height * 0.3,
					}}
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
		</View>
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
