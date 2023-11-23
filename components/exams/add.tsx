import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { FC, useMemo, useState } from 'react';
import {
	KeyboardAvoidingView,
	StyleSheet,
	View,
	useWindowDimensions,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button } from 'react-native-paper';

import { useToast } from '@gluestack-ui/themed';
import dayjs from 'dayjs';
import { primaryColor } from '../../constants/Colors';
import { ExamCenter } from '../../models/examcenters';
import { useAuth } from '../../providers/auth';
import useExamApply from '../../services/exams/apply';
import globalStyles from '../../styles/global';
import ToastError from '../shared/ToastError';
import { User } from '../../models/user';

const AddExamComponent: FC<{
	centers: ExamCenter[];
	user: User | null;
}> = ({ centers, user }) => {
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
				label: item.exam_center,
				value: item.exam_center_id,
			})),
		[centers]
	);

	const router = useRouter();

	const { student_series_id = '' } = useLocalSearchParams();

	const toast = useToast();

	const successFn = () => {
		router.replace('/payexam');
	};

	const errorFn = () => {
		toast.show({
			onCloseComplete() {},
			duration: 5000,
			render: ({ id }) => {
				return (
					<ToastError
						id={id}
						title='Application Error'
						description='Could not complete exam application. Please retry later'
					/>
				);
			},
			placement: 'top',
		});
	};

	const { mutate, isPending } = useExamApply(successFn, errorFn);

	const date = new Date();

	const onSubmit = () => {
		mutate({
			index_id: user?.IndexNo || '',
			exam_centers: selectedCenter + ',' + selectedReason,
			student_series_id: '' + student_series_id,
			application_date: dayjs(date).format('YYYY-MM-DDTHH:mm:ssZ[Z] '),
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
						source={require('../../assets/images/examlarge.png')}
						style={{
							width: usableWidth * 0.5,
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
						placeholder='Select Exam Center'
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
						items={internshipCenters || []}
						value={selectedReason}
						setValue={setSelectedReason}
						multiple={false}
						open={dropDownReason}
						placeholder='Select Alternative Exam Center'
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

				<View>
					<Button
						mode='contained'
						style={styles.button}
						disabled={selectedCenter === null || selectedReason === null}
						onPress={onSubmit}
						loading={isPending}>
						Submit
					</Button>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
};

export default AddExamComponent;

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
