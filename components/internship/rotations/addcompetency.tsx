import {yupResolver} from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import {useRouter} from 'expo-router';
import React, {useCallback, useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {Button, TextInput, TextInputProps} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';
import {useAuth} from '../../../providers/auth';
import {useFetchedCompetency} from '../../../providers/competency';
import {useError} from '../../../providers/error';
import useAddCompetency from '../../../services/internship/addcompetency';
import useInternshipApplications from '../../../services/internship/applications';
import globalStyles from '../../../styles/global';
import DateModal from '../../shared/DateModal';
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
	const {competency} = useFetchedCompetency();

	const [picker, setPicker] = useState(false);

	const [date, setDate] = useState(new Date());

	const togglePicker = () => {
		setPicker(!picker);
	};

	const {
		control,
		handleSubmit,
		formState: {errors},
	} = useForm<Activity>({
		resolver: yupResolver(validationSchema),
	});

	const handleDate = ({type}: any, selectedDate: any) => {
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

	const {user} = useAuth();

	const index_id = user?.IndexNo || '';

	const {data: internship = [], isLoading} = useInternshipApplications(index_id);

	const router = useRouter();

	const successFn = () => {
		router.push('/internship');
		Keyboard.dismiss();
	};

	const {mutate, isPending, isSuccess, reset} = useAddCompetency(successFn);

	const {error, clearError} = useError();

	const showToastError = useCallback(() => {
		Toast.show({
			type: 'error',
			text1: 'Error',
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

	const onSubmit = (data: Activity) => {
		mutate({
			...data,
			internship_id: internship[0]?.internship_id || '',
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
		<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className='flex flex-1 p-2'>
			<ScrollView style={[globalStyles.container, {gap: 10}]}>
				<CompetencyInformationBox competency={competency} />

				<View style={[styles.box]} className='container mx-auto max-h-[400px] h-auto overflow-y-auto'>
					<Controller
						rules={{
							required: true,
						}}
						control={control}
						render={({field: {onChange, onBlur, value}}) => (
							<TextInput
								label='Activity Notes'
								mode='outlined'
								{...textInputProps}
								onChangeText={onChange}
								onBlur={onBlur}
								value={value}
								multiline
								numberOfLines={5}
								maxLength={3000}
								error={!!errors?.activity_notes?.message}
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
			</ScrollView>
		</KeyboardAvoidingView>
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
