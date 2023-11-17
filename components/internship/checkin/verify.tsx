import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import globalStyles from '../../../styles/global';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextInput, TextInputProps } from 'react-native-paper';
import { primaryColor } from '../../../constants/Colors';
import { useAuth } from '../../../providers/auth';
import useVerifyOTP from '../../../services/internship/verifyotp';
import { useLocalSearchParams, useRouter } from 'expo-router';

interface Code {
	code: string;
}

const validationSchema = Yup.object().shape({
	code: Yup.string().required(),
});

const theme = {
	roundness: 10,
};

const VerifyOTPComponent = () => {
	const textProps: TextInputProps = {
		theme,
		style: styles.input,
		outlineColor: '#f9f9f9',
		activeOutlineColor: '#0445b5',
	};
	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useForm<Code>({
		resolver: yupResolver(validationSchema),
		mode: 'onChange',
	});

	const { user } = useAuth();

	const router = useRouter();

	const successFn = () => {
		router.replace('/internshiphistory');
	};

	const { mutate, isPending } = useVerifyOTP(successFn);

	const { mobile_no } = useLocalSearchParams();

	const onSubmit = (data: Code) => {
		mutate({
			index_id: user?.IndexNo || '',
			task: 'verify',
			otp: data.code,
			mobile_no: '' + mobile_no,
		});
	};

	return (
		<KeyboardAvoidingView style={globalStyles.container}>
			<View
				style={[
					{
						margin: 10,
					},
					styles.center,
				]}>
				<View>
					<Controller
						control={control}
						rules={{
							required: true,
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								label='Enter OTP  to verify checkin'
								left={<TextInput.Icon icon='numeric' />}
								mode='outlined'
								{...textProps}
								onChangeText={onChange}
								onBlur={onBlur}
								value={value}
								error={!!errors?.code?.message}
							/>
						)}
						name='code'
					/>

					{!!errors?.code?.message && (
						<Text style={styles.errorText}>{errors?.code?.message}</Text>
					)}
				</View>
				<View>
					<Button
						mode='contained'
						style={styles.button}
						onPress={handleSubmit(onSubmit)}
						loading={isPending}>
						Verify
					</Button>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
};

export default VerifyOTPComponent;

const styles = StyleSheet.create({
	center: {
		justifyContent: 'center',
		flex: 1,
	},

	input: {
		backgroundColor: '#f9f9f9',
	},

	errorText: {
		color: '#ff5252',
		fontSize: 10,
		margin: 5,
	},

	button: {
		backgroundColor: primaryColor,
		borderRadius: 10,
		marginVertical: 10,
	},
});
