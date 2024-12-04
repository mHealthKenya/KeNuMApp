import {yupResolver} from '@hookform/resolvers/yup';
import {Image} from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import mime from 'mime';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, TextInput, TextInputProps} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';
import {primaryColor} from '../../constants/Colors';
import {User} from '../../models/user';
import {useError} from '../../providers/error';
import useProfileUpdate from '../../services/profile/edit';
import {UserImage} from '../internship/apply';
import ProfileHeader from './header';

interface Form {
	address: string;
	email: string;
	mobileno: string;
}

const validationSchema = Yup.object().shape({
	address: Yup.string().required('Address is required'),
	email: Yup.string().required('Email is required'),
	mobileno: Yup.string().required('Mobile number is required'),
});

const UpdateProfileComponent: FC<{user: User | undefined}> = ({user}) => {
	const {
		control,
		formState: {errors},
		handleSubmit,
	} = useForm<Form>({
		resolver: yupResolver(validationSchema),
		mode: 'onChange',
		defaultValues: {
			address: user?.Address || '',
			email: user?.Email || '',
			mobileno: user?.MobileNo || '',
		},
	});

	const theme = {
		roundness: 10,
	};
	const textProps: TextInputProps = {
		theme,
		style: styles.input,
		outlineColor: '#f9f9f9',
		activeOutlineColor: '#0445b5',
	};
	const [image, setImage] = useState<UserImage | null>(null);
	const pickImage = async (name: string) => {
		const result = await ImagePicker.launchImageLibraryAsync({
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

	const {error, clearError} = useError();

	const {mutate, isPending, reset, isSuccess} = useProfileUpdate();

	const onSubmit = (data: Form) => {
		mutate({
			...data,
			profile_pic: image,
		});
	};

	const showToastError = useCallback(() => {
		Toast.show({
			type: 'error',
			text1: 'Auth Error',
			text2: error,
			onShow: () => clearError(),
		});
	}, [error, clearError]);

	const showToastSuccess = useCallback(() => {
		Toast.show({
			type: 'success',
			text1: 'Success',
			text2: 'Your profile was updated!',
			onShow: () => reset(),
		});
	}, [reset]);

	useEffect(() => {
		if (error) {
			showToastError();
		}
	}, [error, showToastError]);

	useEffect(() => {
		if (isSuccess) {
			showToastSuccess();
		}
	}, [isSuccess, showToastSuccess]);

	return (
		<ScrollView style={styles.container}>
			<KeyboardAvoidingView behavior='position'>
				<ProfileHeader user={user} backgroundColor='#eaf2fa' textColor='#0445b5' hideButton />

				<View className='flex flex-col mx-2 bg-[#FFFFFF] py-4 rounded-xl'>
					<View className='p-2'>
						<Controller
							control={control}
							rules={{
								required: true,
							}}
							render={({field: {onChange, onBlur, value}}) => (
								<TextInput
									mode='outlined'
									label='Phone Number'
									{...textProps}
									left={<TextInput.Icon icon='phone' />}
									value={value}
									onBlur={onBlur}
									onChangeText={onChange}
									error={!!errors?.address?.message}
								/>
							)}
							name='mobileno'
						/>

						{!!errors?.mobileno?.message && <Text style={styles.errorText}>{errors?.mobileno?.message}</Text>}
					</View>
					<View className='p-2'>
						<Controller
							control={control}
							rules={{
								required: true,
							}}
							render={({field: {onChange, onBlur, value}}) => (
								<TextInput
									mode='outlined'
									label='Email Address'
									{...textProps}
									left={<TextInput.Icon icon='email' />}
									value={value}
									onBlur={onBlur}
									onChangeText={onChange}
									error={!!errors?.address?.message}
								/>
							)}
							name='email'
						/>

						{!!errors?.email?.message && <Text style={styles.errorText}>{errors?.email?.message}</Text>}
					</View>
					<View className='p-2'>
						<Controller
							control={control}
							rules={{
								required: true,
							}}
							render={({field: {onChange, onBlur, value}}) => (
								<TextInput
									mode='outlined'
									label='Address'
									{...textProps}
									left={<TextInput.Icon icon='map-marker' />}
									value={value}
									onBlur={onBlur}
									onChangeText={onChange}
									error={!!errors?.address?.message}
								/>
							)}
							name='address'
						/>

						{!!errors?.address?.message && <Text style={styles.errorText}>{errors?.address?.message}</Text>}
					</View>
					<Pressable onPress={() => pickImage('cpd_evidence')} className='p-2'>
						<TextInput
							label='Upload Profile'
							left={<TextInput.Icon icon='subtitles' />}
							right={
								<TextInput.Icon
									onPress={() => pickImage('profile_pic')}
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
							onPressIn={() => pickImage('cpd_evidence')}
							{...textProps}
						/>
					</Pressable>
					<View className='p-2'>
						<Button style={styles.button} mode='contained' onPress={handleSubmit(onSubmit)} loading={isPending}>
							Update Profile
						</Button>
					</View>
				</View>
			</KeyboardAvoidingView>
		</ScrollView>
	);
};

export default UpdateProfileComponent;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#eaf2fa',
		flex: 1,
	},
	spacer: {
		marginVertical: 20,
		marginHorizontal: 10,
		flex: 1,
	},
	card: {
		flex: 1,
		backgroundColor: 'white',
		borderRadius: 10,
		padding: 16,
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.3,
		shadowRadius: 6,
		elevation: 14,
		justifyContent: 'space-evenly',
	},

	input: {
		backgroundColor: '#f9f9f9',
	},

	inputContainer: {
		padding: 10,
	},
	errorText: {
		color: '#ff5252',
		fontSize: 10,
		margin: 5,
	},

	button: {
		borderRadius: 5,
		marginTop: 10,
		backgroundColor: primaryColor,
	},
});
