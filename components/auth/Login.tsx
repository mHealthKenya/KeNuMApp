import {yupResolver} from '@hookform/resolvers/yup';
import {Link} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import React, {useCallback, useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Image, KeyboardAvoidingView, StyleSheet, View, useWindowDimensions} from 'react-native';
import {Avatar, Button, TextInput, TextInputProps} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';
import {useAuth} from '../../providers/auth';
import {useError} from '../../providers/error';
import useLogin from '../../services/auth/login';
import globalStyles from '../../styles/global';
import {Text} from '../Themed';

export interface Credentials {
	username: string;
	password: string;
}

const validationSchema = Yup.object().shape({
	username: Yup.string().required(),
	password: Yup.string().required(),
});

const LoginComponent = () => {
	const [show, setShow] = useState(false);

	const toggleShow = () => {
		setShow((show) => !show);
	};

	const theme = {
		roundness: 12,
	};

	const textInputProps: TextInputProps = {
		theme: theme,
		style: styles.input,
		outlineColor: '#f9f9f9',
		activeOutlineColor: '#0445b5',
	};

	const {height, width} = useWindowDimensions();

	const {
		control,
		formState: {errors},
		handleSubmit,
	} = useForm<Credentials>({
		resolver: yupResolver(validationSchema),
		mode: 'onChange',
	});

	const {mutate, isPending} = useLogin();

	const {isLoading} = useAuth();

	const {error, clearError} = useError();

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		if (error) {
	// 			clearError();
	// 		}
	// 	}, 3000);
	// }, [error, clearError]);

	if (error) {
		console.log(error);
	}

	const onSubmit = (data: Credentials) => {
		mutate(data);
	};

	const showToast = useCallback(() => {
		Toast.show({
			type: 'error',
			text1: 'Auth Error',
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
		<SafeAreaView style={globalStyles.container}>
			<KeyboardAvoidingView behavior='position'>
				<View
					style={[
						styles.imageBox,
						{
							height: height * 0.3,
						},
					]}>
					<Image
						source={require('../../assets/images/medical-team.png')}
						style={[{height: height * 0.2, width: width * 0.6}]}
					/>
				</View>
				<View style={styles.inner}>
					<View style={[globalStyles.column, styles.gap]}>
						<Text style={styles.titleText} bold>
							Welcome Back
						</Text>
						<Text>Login to manage your account</Text>
					</View>
				</View>
				<View
					style={[
						styles.inner,
						{
							height: height * 0.3,
							justifyContent: 'space-around',
						},
					]}>
					<Controller
						control={control}
						rules={{
							required: true,
						}}
						render={({field: {onChange, onBlur, value}}) => (
							<TextInput
								mode='outlined'
								label='Username or Email'
								onChangeText={onChange}
								onBlur={onBlur}
								value={value}
								error={!!errors?.username?.message}
								{...textInputProps}
								defaultValue=''
								textContentType='oneTimeCode'
							/>
						)}
						name='username'
					/>

					{!!errors?.username?.message && <Text style={styles.errorText}>{errors?.username?.message}</Text>}

					<Controller
						control={control}
						rules={{
							required: true,
						}}
						render={({field: {onChange, onBlur, value}}) => (
							<TextInput
								mode='outlined'
								label='Password'
								{...textInputProps}
								onChangeText={onChange}
								onBlur={onBlur}
								secureTextEntry={!show}
								right={<TextInput.Icon icon={show ? 'eye-off-outline' : 'eye-outline'} onPress={toggleShow} />}
								value={value}
								error={!!errors?.password?.message}
								defaultValue=''
								textContentType='oneTimeCode'
							/>
						)}
						name='password'
					/>

					{!!errors?.password?.message && <Text style={styles.errorText}>{errors?.password?.message}</Text>}

					<Button mode='contained' style={styles.button} onPress={handleSubmit(onSubmit)} loading={isPending || isLoading}>
						Login
					</Button>
					<View className='flex items-end'>
						<Link href='https://osp.nckenya.go.ke/password' className='text-[#0445b5]'>
							Forgot Password?
						</Link>
					</View>
				</View>
				<View
					style={[
						styles.inner,
						{
							height: height * 0.27,
							justifyContent: 'flex-end',
							padding: 25,
						},
					]}>
					<View
						style={[
							globalStyles.column,
							{
								gap: 10,
							},
						]}>
						<View
							style={{
								marginBottom: 10,
							}}>
							<Text style={styles.logoText}>In Partnership With</Text>
						</View>
						<View
							style={[
								globalStyles.row,
								{
									justifyContent: 'space-between',
									gap: 5,
								},
							]}>
							<Avatar.Image source={require('../../assets/images/coat.png')} style={globalStyles.onlyAvatar} size={50} />
							<Avatar.Image source={require('../../assets/images/aku.png')} style={globalStyles.blankAvatar} size={50} />

							<Avatar.Image source={require('../../assets/images/nck.jpg')} style={globalStyles.blankAvatar} size={50} />
							<Avatar.Image source={require('../../assets/images/MHEALTH.png')} style={globalStyles.blankAvatar} size={50} />
						</View>
					</View>
				</View>
			</KeyboardAvoidingView>
			<StatusBar hidden />
		</SafeAreaView>
	);
};

export default LoginComponent;

const styles = StyleSheet.create({
	imageBox: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},

	inner: {
		marginHorizontal: 45,
	},

	titleText: {
		fontSize: 25,
		fontWeight: 'bold',
	},

	gap: {
		gap: 10,
	},

	input: {
		backgroundColor: '#f9f9f9',
	},

	button: {
		backgroundColor: '#0445b5',
		borderRadius: 12,
		padding: 3,
	},

	logoText: {
		textAlign: 'center',
	},

	errorText: {
		color: '#ff5252',
		fontSize: 18,
		fontStyle: 'italic',
	},
});
