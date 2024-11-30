import {useToast} from '@gluestack-ui/themed';
import {yupResolver} from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import {Image} from 'expo-image';
import {useRouter} from 'expo-router';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import {Button, TextInput, TextInputProps} from 'react-native-paper';
import * as Yup from 'yup';
import {primaryColor} from '../../../constants/Colors';
import {useAuth} from '../../../providers/auth';
import useInternshipApplications from '../../../services/internship/applications';
import useInternshipCheckin from '../../../services/internship/checkin';
import ToastError from '../../shared/ToastError';

interface Form {
	nurse_officer_incharge: string;
	nurse_officer_incharge_mobile: string;
	supervisor: string;
	supervisor_mobile: string;
	nurse_officer_incharge_email: string;
	supervisor_email: string;
}

const validationSchema = Yup.object().shape({
	nurse_officer_incharge: Yup.string().required('This field is required'),
	nurse_officer_incharge_mobile: Yup.string().required('This field is required'),
	supervisor: Yup.string().required('This field is required'),
	supervisor_mobile: Yup.string().required('This field is required'),
	nurse_officer_incharge_email: Yup.string().email().required('This field is required'),
	supervisor_email: Yup.string().email().required('This field is required'),
});

const theme = {
	roundness: 10,
};

const AddCheckinComponent = () => {
	const textProps: TextInputProps = {
		theme,
		style: styles.input,
		outlineColor: '#f9f9f9',
		activeOutlineColor: '#0445b5',
	};

	const toast = useToast();
	const {width, height} = useWindowDimensions();
	const actualWidth = Math.min(width, height);
	const usableWidth = actualWidth - 20;

	const {
		control,
		formState: {errors},
		handleSubmit,
	} = useForm<Form>({
		resolver: yupResolver(validationSchema),
		mode: 'onChange',
	});

	const {user} = useAuth();
	const index_id = user?.IndexNo || '';

	const {data: internships, isError, isLoading} = useInternshipApplications(index_id);
	const [mobile_no, setMobile_no] = useState('');
	const router = useRouter();

	const successFn = () => {
		router.push({
			pathname: '/verifyotpcheck',
			params: {
				mobile_no,
			},
		});
	};

	const errorFn = () => {
		toast.show({
			onCloseComplete() {},
			duration: 5000,
			render: ({id}) => {
				return (
					<ToastError
						id={id}
						title='Application Error'
						description='Could not complete internship checkin. Please retry later'
					/>
				);
			},
			placement: 'top',
		});
	};

	const {mutate, isPending} = useInternshipCheckin(successFn, errorFn);

	const onSubmit = (data: Form) => {
		const date = dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ssZ[Z] ');
		const internship_id = `${internships![0].internship_id}`;
		setMobile_no(data.nurse_officer_incharge_mobile);
		mutate({
			...data,
			checkin_date: date,
			internship_id,
		});
	};

	return (
		<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className='flex flex-1'>
			<ScrollView contentContainerStyle={styles.scrollContainer}>
				<View className='items-center justify-center'>
					<Image
						source={require('../../../assets/images/checkin.png')}
						style={{
							width: usableWidth * 0.2,
							height: height * 0.2,
						}}
					/>
				</View>
				<View style={styles.formContainer}>
					<Controller
						control={control}
						rules={{required: true}}
						render={({field: {onChange, onBlur, value}}) => (
							<TextInput
								label='CNO'
								left={<TextInput.Icon icon='doctor' />}
								mode='outlined'
								{...textProps}
								onChangeText={onChange}
								onBlur={onBlur}
								value={value}
								error={!!errors?.nurse_officer_incharge?.message}
							/>
						)}
						name='nurse_officer_incharge'
					/>
					{!!errors?.nurse_officer_incharge?.message && (
						<Text style={styles.errorText}>{errors?.nurse_officer_incharge?.message}</Text>
					)}

					<Controller
						control={control}
						rules={{required: true}}
						render={({field: {onChange, onBlur, value}}) => (
							<TextInput
								label='CNO Phone'
								left={<TextInput.Icon icon='phone' />}
								mode='outlined'
								{...textProps}
								onChangeText={onChange}
								onBlur={onBlur}
								value={value}
								error={!!errors?.nurse_officer_incharge_mobile?.message}
							/>
						)}
						name='nurse_officer_incharge_mobile'
					/>
					{!!errors?.nurse_officer_incharge_mobile?.message && (
						<Text style={styles.errorText}>{errors?.nurse_officer_incharge_mobile?.message}</Text>
					)}

					<Controller
						control={control}
						rules={{required: true}}
						render={({field: {onChange, onBlur, value}}) => (
							<TextInput
								label='CNO Email'
								left={<TextInput.Icon icon='email' />}
								mode='outlined'
								{...textProps}
								onChangeText={onChange}
								onBlur={onBlur}
								value={value}
							/>
						)}
						name='nurse_officer_incharge_email'
					/>
					{!!errors?.nurse_officer_incharge_email?.message && (
						<Text style={styles.errorText}>{errors?.nurse_officer_incharge_email?.message}</Text>
					)}

					<Controller
						control={control}
						rules={{required: true}}
						render={({field: {onChange, onBlur, value}}) => (
							<TextInput
								label='Director Nursing Services Name'
								left={<TextInput.Icon icon='doctor' />}
								mode='outlined'
								{...textProps}
								onChangeText={onChange}
								onBlur={onBlur}
								value={value}
							/>
						)}
						name='supervisor'
					/>
					{!!errors?.supervisor?.message && <Text style={styles.errorText}>{errors?.supervisor?.message}</Text>}

					<Controller
						control={control}
						rules={{required: true}}
						render={({field: {onChange, onBlur, value}}) => (
							<TextInput
								label='Director Nursing Services Phone'
								left={<TextInput.Icon icon='phone' />}
								mode='outlined'
								{...textProps}
								onChangeText={onChange}
								onBlur={onBlur}
								value={value}
							/>
						)}
						name='supervisor_mobile'
					/>
					{!!errors?.supervisor_mobile?.message && (
						<Text style={styles.errorText}>{errors?.supervisor_mobile?.message}</Text>
					)}

					<Controller
						control={control}
						rules={{required: true}}
						render={({field: {onChange, onBlur, value}}) => (
							<TextInput
								label='Director Nursing Services Email'
								left={<TextInput.Icon icon='email' />}
								mode='outlined'
								{...textProps}
								onChangeText={onChange}
								onBlur={onBlur}
								value={value}
							/>
						)}
						name='supervisor_email'
					/>
					{!!errors?.supervisor_email?.message && <Text style={styles.errorText}>{errors?.supervisor_email?.message}</Text>}

					<View>
						<Button
							mode='contained'
							style={styles.button}
							onPress={handleSubmit(onSubmit)}
							disabled={isLoading || isError}
							loading={isPending}>
							Check In
						</Button>
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default AddCheckinComponent;

const styles = StyleSheet.create({
	center: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	formContainer: {
		padding: 10,
		margin: 10,
	},
	input: {
		backgroundColor: '#f9f9f9',
	},
	button: {
		backgroundColor: primaryColor,
		borderRadius: 5,
		padding: 10,
		marginTop: 10,
	},
	scrollContainer: {
		paddingBottom: 20,
	},
	errorText: {
		color: 'red',
		fontSize: 12,
		marginTop: 5,
	},
});
