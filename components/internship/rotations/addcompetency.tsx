import dayjs from 'dayjs';
import React, { useState } from 'react';
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	StyleSheet,
	View,
} from 'react-native';
import { Button, TextInput, TextInputProps } from 'react-native-paper';
import { useFetchedCompetency } from '../../../providers/competency';
import globalStyles from '../../../styles/global';
import DateModal from '../../shared/DateModal';
import CompetencyInformationBox from './competencyinformationbox';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useAddCompetency from '../../../services/internship/addcompetency';
import useInternshipApplications from '../../../services/internship/applications';

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

	const successFn = () => {
		Keyboard.dismiss();
	};

	const { mutate, isPending } = useAddCompetency(successFn);

	const onSubmit = (data: Activity) => {
		mutate({
			...data,
			internship_id: internship![0].internship_id,
			competency_id: competency?.competency_id || '',
			activity_date: dayjs(new Date(date)).format('YYYY-MM-DD HH:mm:ss'),
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
