import React, { FC, useMemo, useState } from 'react';
import {
	KeyboardAvoidingView,
	ScrollView,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from 'react-native';
import { InternshipCenter } from '../../../models/internshipcenters';
import { TransferReason } from '../../../models/transferreasons';
import globalStyles from '../../../styles/global';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button, TextInput, TextInputProps } from 'react-native-paper';
import { primaryColor } from '../../../constants/Colors';
import { Image } from 'expo-image';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import useInternshipTransfer from '../../../services/internship/transfer';
import { useAuth } from '../../../providers/auth';
import useInternshipApplications from '../../../services/internship/applications';
import { useRouter } from 'expo-router';

interface Transfer {
	transfer_request_desc: string;
}

const validationSchema = Yup.object().shape({
	transfer_request_desc: Yup.string().required(),
});

const RequestTransferComponent: FC<{
	centers: InternshipCenter[];
	reasons: TransferReason[];
}> = ({ centers, reasons }) => {
	const [dropDownCenter, setDropDownCenter] = useState(false);
	const [dropDownReason, setDropDownReason] = useState(false);
	const [selectedCenter, setSelectedCenter] = useState(null);
	const [selectedReason, setSelectedReason] = useState(null);

	const { width, height } = useWindowDimensions();
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
		formState: { errors },
	} = useForm<Transfer>({
		resolver: yupResolver(validationSchema),
	});

	const router = useRouter();

	const successFn = () => {
		router.replace('/transferhist');
	};

	const { mutate, isPending } = useInternshipTransfer(successFn);

	const { data: internships, isLoading, isError } = useInternshipApplications();

	const onSubmit = (data: Transfer) => {
		mutate({
			...data,
			transfer_internship_center: selectedCenter || '',
			transfer_reason_id: selectedReason || '',
			internship_id: internships![0].internship_id,
		});
	};

	return (
		<View style={globalStyles.container}>
			<KeyboardAvoidingView
				style={[styles.box, { position: 'relative', flex: 1 }]}
				behavior='position'
				enabled
				keyboardVerticalOffset={45}>
				<View
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						height: height * 0.25,
					}}>
					<Image
						source={require('../../../assets/images/transfersmall.png')}
						style={{
							width: usableWidth * 0.3,
							height: height * 0.2,
						}}
					/>
				</View>
				<View
					style={{
						height: dropDownCenter ? height * 0.3 : height * 0.07,
					}}>
					<DropDownPicker
						items={internshipCenters || []}
						value={selectedCenter}
						setValue={setSelectedCenter}
						multiple={false}
						open={dropDownCenter}
						placeholder='Select a facility'
						placeholderStyle={{
							fontSize: 16,
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
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								onChangeText={onChange}
								onBlur={onBlur}
								value={value}
								mode='outlined'
								{...textInputProps}
								dense
								label='Description'
								error={!!errors?.transfer_request_desc?.message}
								multiline
								numberOfLines={5}
								scrollEnabled={false}
							/>
						)}
						name='transfer_request_desc'
					/>

					{!!errors?.transfer_request_desc?.message && (
						<Text style={styles.errorText}>
							{errors?.transfer_request_desc?.message}
						</Text>
					)}
				</View>
				<View>
					<Button
						mode='contained'
						style={styles.button}
						disabled={
							selectedCenter === null ||
							selectedReason === null ||
							isError ||
							isLoading
						}
						onPress={handleSubmit(onSubmit)}
						loading={isPending}>
						Submit
					</Button>
				</View>
			</KeyboardAvoidingView>
		</View>
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
});
