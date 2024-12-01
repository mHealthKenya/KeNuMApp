import {yupResolver} from '@hookform/resolvers/yup';
import {Image} from 'expo-image';
import {useRouter} from 'expo-router';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {Button, TextInput, TextInputProps} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';
import {primaryColor} from '../../../constants/Colors';
import {InternshipCenter} from '../../../models/internshipcenters';
import {TransferReason} from '../../../models/transferreasons';
import {useAuth} from '../../../providers/auth';
import {useError} from '../../../providers/error';
import useInternshipApplications from '../../../services/internship/applications';
import useInternshipTransfer from '../../../services/internship/transfer';

interface Transfer {
	transfer_request_desc: string;
}

const validationSchema = Yup.object().shape({
	transfer_request_desc: Yup.string().required(),
});

const RequestTransferComponent: FC<{
	centers: InternshipCenter[];
	reasons: TransferReason[];
}> = ({centers, reasons}) => {
	const [dropDownCenter, setDropDownCenter] = useState(false);
	const [dropDownReason, setDropDownReason] = useState(false);
	const [selectedCenter, setSelectedCenter] = useState(null);
	const [selectedReason, setSelectedReason] = useState(null);

	const {width, height} = useWindowDimensions();
	const actualWidth = Math.min(width, height);
	const usableWidth = actualWidth - 20;

	const internshipCenters = useMemo(
		() =>
			centers?.map((item) => ({
				label: item.internship_center,
				value: item.id,
			})),
		[centers]
	);

	const transferReasons = useMemo(
		() =>
			reasons.map((item) => ({
				label: item.transfer_reason,
				value: item.transfer_reason_id,
			})),
		[reasons]
	);

	const theme = {
		roundness: 12,
	};

	const textInputProps: TextInputProps = {
		theme: theme,
		style: styles.input,
		outlineColor: '#f9f9f9',
		activeOutlineColor: '#0445b5',
	};

	const {
		control,
		handleSubmit,
		formState: {errors},
	} = useForm<Transfer>({
		resolver: yupResolver(validationSchema),
	});

	const router = useRouter();

	const successFn = () => {
		router.replace('/transferhist');
	};

	const {mutate, isPending} = useInternshipTransfer(successFn);

	const {user} = useAuth();

	const index_id = user?.IndexNo || '';

	const {data: internships, isLoading, isError} = useInternshipApplications(index_id);

	const onSubmit = (data: Transfer) => {
		mutate({
			...data,
			transfer_internship_center: selectedCenter || '',
			transfer_reason_id: selectedReason || '',
			internship_id: internships![0].internship_id,
		});

		Keyboard.dismiss();
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
		<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className='flex flex-1 p-2'>
			<ScrollView contentContainerStyle={styles.scrollContainer}>
				<View className='flex justify-center items-center'>
					<Image
						source={require('../../../assets/images/transfersmall.png')}
						style={{
							width: usableWidth * 0.3,
							height: height * 0.2,
						}}
					/>
				</View>
				<View className='flex flex-col gap-2'>
					<View className='flex'>
						<DropDownPicker
							items={internshipCenters || []}
							value={selectedCenter}
							setValue={setSelectedCenter}
							multiple={false}
							open={dropDownCenter}
							placeholder='Select a facility'
							placeholderStyle={{
								fontSize: 16,
								fontFamily: 'normal',
							}}
							textStyle={{
								fontFamily: 'normal',
							}}
							searchable
							setOpen={setDropDownCenter}
							style={[
								styles.input,
								{
									borderColor: dropDownCenter ? '#0445b5' : '#f9f9f9',
								},
							]}
						/>
					</View>

					<View
						style={{
							height: dropDownReason ? height * 0.3 : height * 0.07,
						}}>
						<DropDownPicker
							items={transferReasons || []}
							value={selectedReason}
							setValue={setSelectedReason}
							multiple={false}
							open={dropDownReason}
							placeholder='Select a transfer reason'
							placeholderStyle={{
								fontSize: 16,
								fontFamily: 'normal',
							}}
							textStyle={{
								fontFamily: 'normal',
							}}
							searchable
							setOpen={setDropDownReason}
							style={[
								styles.input,
								{
									borderColor: dropDownReason ? '#0445b5' : '#f9f9f9',
								},
							]}
						/>
					</View>
					<View
						style={{
							marginVertical: 5,
						}}>
						<Controller
							rules={{
								required: true,
							}}
							control={control}
							render={({field: {onChange, onBlur, value}}) => (
								<TextInput
									onChangeText={onChange}
									onBlur={onBlur}
									value={value}
									mode='outlined'
									{...textInputProps}
									label='Description'
									error={!!errors?.transfer_request_desc?.message}
									multiline
									numberOfLines={5}
									scrollEnabled={false}
									maxLength={3000}
								/>
							)}
							name='transfer_request_desc'
						/>

						{!!errors?.transfer_request_desc?.message && (
							<Text style={styles.errorText}>{errors?.transfer_request_desc?.message}</Text>
						)}
					</View>
					<View>
						<Button
							mode='contained'
							style={styles.button}
							disabled={selectedCenter === null || selectedReason === null || isError || isLoading}
							onPress={handleSubmit(onSubmit)}
							loading={isPending}>
							Submit
						</Button>
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default RequestTransferComponent;

const styles = StyleSheet.create({
	input: {
		backgroundColor: '#f9f9f9',
	},

	box: {
		margin: 10,
		padding: 10,
	},

	button: {
		borderRadius: 5,
		backgroundColor: primaryColor,
		marginTop: 5,
	},

	errorText: {
		color: '#ff5252',
		fontSize: 10,
		margin: 5,
	},

	scrollContainer: {
		paddingBottom: 50,
	},
});
