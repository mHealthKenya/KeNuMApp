import { useToast } from '@gluestack-ui/themed';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	StyleSheet,
	View,
} from 'react-native';
import { Button, TextInput, TextInputProps } from 'react-native-paper';
import * as Yup from 'yup';
import { useFetchedCompetency } from '../../../providers/competency';
import useAddCompetency from '../../../services/internship/addcompetency';
import useInternshipApplications from '../../../services/internship/applications';
import globalStyles from '../../../styles/global';
import DateModal from '../../shared/DateModal';
import ToastError from '../../shared/ToastError';
import ToastSuccess from '../../shared/ToastSuccess';
import CompetencyInformationBox from './competencyinformationbox';

interface Activity {
	activity_notes: string;
}

const theme = {
	roundness: 10,
};

const validationSchema = Yup.object().shape({
	activity_notes: Yup.string().required('You must record activity notes'),
});

const AddCompetencyComponent = () => {
	const currentYear = new Date().getFullYear();
	const { competency } = useFetchedCompetency();

	const [picker, setPicker] = useState(false);

	const [date, setDate] = useState(new Date());

	const togglePicker = () => {
		setPicker(!picker);
	};

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<Activity>({
		resolver: yupResolver(validationSchema),
	});

	const handleDate = ({ type }: any, selectedDate: any) => {
		if (type === 'set') {
			setDate(selectedDate);

			if (Platform.OS === 'android') {
				togglePicker();
			}
		} else {
			togglePicker();
		}
	};

	const cancelDate = () => {
		togglePicker();
		setDate(new Date());
	};

	const { data: internship, isLoading } = useInternshipApplications();

	const router = useRouter();

	const successFn = () => {
		toast.show({
			onCloseComplete() {},
			duration: 5000,
			render: ({ id }) => {
				return (
					<ToastSuccess
						id={id}
						title='Competency Recorded'
						description='Your competency has been successfully recorded'
					/>
				);
			},
			placement: 'top',
		});

		router.push('/internship');
		Keyboard.dismiss();
	};

	const toast = useToast();

	const errorFn = () => {
		toast.show({
			onCloseComplete() {},
			duration: 5000,
			render: ({ id }) => {
				return (
					<ToastError
						id={id}
						title='Recording Error'
						description='Could not complete recording your competency. Please retry later'
					/>
				);
			},
			placement: 'top',
		});
	};

	const { mutate, isPending } = useAddCompetency(successFn, errorFn);

	const onSubmit = (data: Activity) => {
		mutate({
			...data,
			internship_id: internship![0].internship_id,
			competency_id: competency?.competency_id || '',
			activity_date: dayjs(new Date(date)).format('YYYY-MM-DDTHH:mm:ssZ[Z] '),
		});
	};

	const textInputProps: TextInputProps = {
		theme: theme,
		style: styles.input,
		outlineColor: '#f9f9f9',
		activeOutlineColor: '#0445b5',
	};
	return (
		<View style={[globalStyles.container, { gap: 10 }]}>
			<CompetencyInformationBox competency={competency} />
			<KeyboardAvoidingView behavior='position'>
				<View style={[styles.box]}>
					<Controller
						rules={{
							required: true,
						}}
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								label='Activity Notes'
								mode='outlined'
								{...textInputProps}
								onChangeText={onChange}
								onBlur={onBlur}
								value={value}
								multiline
								numberOfLines={5}
							/>
						)}
						name='activity_notes'
					/>
				</View>
				<View style={[styles.box]}>
					<Pressable onPress={togglePicker}>
						<TextInput
							label='Activity Date'
							left={<TextInput.Icon icon='clock' />}
							mode='outlined'
							{...textInputProps}
							value={dayjs(date).format('MMMM DD YYYY')}
							editable={false}
							onPressIn={togglePicker}
						/>
					</Pressable>

					{picker && (
						<DateModal
							items={{
								show: picker,
								toggleModal: togglePicker,
								cancelDate,
								date,
								handleDate,
							}}
							minimumDate={new Date(currentYear, 0, 1)}
						/>
					)}
				</View>

				<Button
					mode='contained'
					style={styles.button}
					onPress={handleSubmit(onSubmit)}
					loading={isPending}
					disabled={isLoading}>
					Record
				</Button>
			</KeyboardAvoidingView>
		</View>
	);
};

export default AddCompetencyComponent;

const styles = StyleSheet.create({
	box: {
		marginVertical: 10,
		paddingHorizontal: 10,
	},

	input: {
		backgroundColor: '#f9f9f9',
	},

	button: {
		backgroundColor: '#0445b5',
		borderRadius: 12,
		margin: 10,
		paddingHorizontal: 10,
	},

	errorText: {
		color: '#ff5252',
		fontSize: 18,
		fontStyle: 'italic',
	},
});
