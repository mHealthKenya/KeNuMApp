import React, {FC, useState} from 'react';
import {KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {User} from '../../models/user';
import WarnAlert from '../shared/WarnAlert';
import EducationItem from './educationitem';
import ProfileHeader from './header';
import globalStyles from '../../styles/global';
import * as ImagePicker from 'expo-image-picker';
import mime from 'mime';
import {Button, Switch, TextInput, TextInputProps} from 'react-native-paper';
import {Image} from 'expo-image';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {Text} from 'react-native';
import {primaryColor} from '../../constants/Colors';
import { useToast} from '@gluestack-ui/themed';
import ToastError from '../shared/ToastError';
import ToastSuccess from '../shared/ToastSuccess';
import useProfileUpdate from '../../services/profile/edit';

interface Form {
	address: string;
	email: string;
	mobileno: string;
    twoFactorAuthEnabled?: boolean;
}

const validationSchema = Yup.object().shape({
	address: Yup.string().required('Address is required'),
	email: Yup.string().required('Email is required'),
	mobileno: Yup.string().required('Mobile number is required'),
    
});

const UpdateProfileComponent: FC<{user: User | undefined}> = ({user}) => {
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
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
	const [image, setImage] = useState<any>();
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

	const toast = useToast();

	const successFn = () => {
		toast.show({
			onCloseComplete() {},
			duration: 5000,
			render: ({id}) => {
				return <ToastSuccess id={id} title='Success' description='Profile updated successfully' />;
			},
			placement: 'top',
		});
	};

	const errorFn = () => {
		toast.show({
			onCloseComplete() {},
			duration: 5000,
			render: ({id}) => {
				return <ToastError id={id} title='Error' description='Could not update profile. Try again later.' />;
			},
			placement: 'top',
		});
	};

	const {mutate, isPending} = useProfileUpdate(successFn, errorFn);

	const onSubmit = (data: Form) => {
	 mutate({
			...data,
			profile_pic: image,
            twoFactorAuthEnabled: isSwitchOn
		});
	};

	return (
		<ScrollView style={styles.container}>
			<KeyboardAvoidingView behavior='position'>
				<ProfileHeader user={user} backgroundColor='#eaf2fa' textColor='#0445b5' hideButton />

				<View style={[globalStyles.column, styles.card, {marginHorizontal: 10}]}>
					<View>
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
					<View>
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
					<View>
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
                    <Pressable onPress={() => pickImage('cpd_evidence')}>
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
                    <View>
                        <Text className="mt-5 mb-2 font-normal">Enable 2 Factor Authentication</Text>
                        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
					</View>
					

					<Button style={styles.button} mode='contained' onPress={handleSubmit(onSubmit)} loading={isPending}>
						Update Profile
					</Button>
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
