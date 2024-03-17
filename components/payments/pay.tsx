import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';
import React, { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Button, TextInput, TextInputProps } from 'react-native-paper';
import * as Yup from 'yup';
import { primaryColor } from '../../constants/Colors';
import useSTK from '../../services/payments/stk';
import globalStyles from '../../styles/global';

interface Pay {
	amount: number;
	acc_no: string;
	title: string;
	transaction: string;
	subtitle?: string;
	redirectPath: any;
}

export interface PayCredentials {
	phone: string;
}

const validationSchema = Yup.object().shape({
	phone: Yup.string().required(),
});

const PayComponent: FC<{ pay: Pay }> = ({
	pay: { amount, title, acc_no, subtitle, transaction, redirectPath },
}) => {
	const router = useRouter();

	const successFn = () => {
		router.push(redirectPath);
	};

	const { mutate, isPending } = useSTK(successFn);

	const theme = {
		roundness: 12,
	};

	const data = [
		{
			label: 'Go to M-PESA menu on your phone',
			index: 1,
		},
		{
			label: 'Select lipa na M-PESA',
			index: 2,
		},
		{
			label: 'Select pay bill',
			index: 3,
		},
		{
			label: 'Enter pay bill number 12345',
			index: 4,
		},
		{
			label: `Enter account number ${acc_no}`,
			index: 5,
		},
		{
			label: `Enter amount ${amount}`,
			index: 6,
		},
		{
			label: 'Enter your M-PESA pin',
			index: 7,
		},
		{
			label: 'Submit payment',
			index: 8,
		},
		{
			label: 'Wait for confirmation',
			index: 9,
		},
	];

	const textInputProps: TextInputProps = {
		theme: theme,
		style: styles.input,
		outlineColor: '#f9f9f9',
		activeOutlineColor: '#0445b5',
	};
	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useForm<PayCredentials>({
		resolver: yupResolver(validationSchema),
		mode: 'onChange',
	});

	const onSubmit = (data: PayCredentials) => {
		mutate({
			phone_no: data.phone,
			transaction,
			invoice_no: acc_no,
		});
	};

	return (
		<View style={globalStyles.container}>
			<View style={styles.box}>
				<View style={[globalStyles.column, { gap: 10 }]}>
					<Text style={styles.headerText}>{title}</Text>
					<Text style={styles.mutedText}>{subtitle}</Text>
				</View>

				<Controller
					control={control}
					rules={{
						required: true,
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							mode='outlined'
							label='Phone Number'
							onChangeText={onChange}
							onBlur={onBlur}
							value={value}
							error={!!errors?.phone?.message}
							{...textInputProps}
							defaultValue=''
							textContentType='oneTimeCode'
							left={<TextInput.Icon icon='phone' />}
						/>
					)}
					name='phone'
				/>
				<View style={{ marginVertical: 15 }}>
					<Button
						mode='contained'
						style={styles.button}
						loading={isPending}
						onPress={handleSubmit(onSubmit)}>
						Pay
					</Button>
				</View>

				<View>
					<View style={{ marginVertical: 10 }}>
						<FlatList
							data={data}
							renderItem={({ item }) => (
								<View style={[globalStyles.row, { padding: 10 }]}>
									<Text style={styles.normalText}>{item.index}. </Text>
									<Text style={styles.normalText}>{item.label}. </Text>
								</View>
							)}
						/>
					</View>
				</View>
			</View>
		</View>
	);
};

export default PayComponent;

const styles = StyleSheet.create({
	box: {
		marginVertical: 30,
		gap: 20,
		padding: 20,
	},

	input: {
		backgroundColor: '#f9f9f9',
	},

	headerText: {
		fontSize: 35,
		fontWeight: 'bold',
		letterSpacing: 2,
		textTransform: 'capitalize',
	},

	normalText: {
		fontSize: 16,
		letterSpacing: 1.5,
	},

	button: {
		backgroundColor: primaryColor,
		borderRadius: 12,
	},

	mutedText: {
		fontSize: 14,
		textTransform: 'capitalize',
		letterSpacing: 1.5,
		padding: 10,
	},
});
