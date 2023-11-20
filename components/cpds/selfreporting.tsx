import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import mime from 'mime';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
	KeyboardAvoidingView,
	Platform,
	Pressable,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from 'react-native';
import { Button, TextInput, TextInputProps } from 'react-native-paper';
import * as Yup from 'yup';
import { primaryColor } from '../../constants/Colors';
import { useAuth } from '../../providers/auth';
import globalStyles from '../../styles/global';
import DateModal from '../shared/DateModal';
import useSelfReport from '../../services/cpds/self';
import { useCPDCategoryFetched } from '../../providers/cpdcategories';

interface Form {
	event_location: string;
	event_title: string;
}

interface UserImage {
	uri: string | null;
	name: string;
	type?: string;
}

const validationSchema = Yup.object().shape({
	event_location: Yup.string().required('Event location is required'),
	event_title: Yup.string().required('Event title is required'),
});

const CPDSelfReportingComponent = () => {
	const currentYear = new Date().getFullYear();
	const { width, height } = useWindowDimensions();
	const actualWidth = Math.min(width, height);
	const usableWidth = actualWidth - 20;

	const { category_id } = useCPDCategoryFetched();

	const [image, setImage] = useState<UserImage>();

	const theme = {
		roundness: 10,
	};

	const textProps: TextInputProps = {
		theme,
		style: styles.input,
		outlineColor: '#f9f9f9',
		activeOutlineColor: '#0445b5',
	};

	const [date, setDate] = useState(new Date());

	const [picker, setPicker] = useState(false);

	const togglePicker = () => {
		setPicker(!picker);
	};

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

	const pickImage = async (name: string) => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			const item = {
				uri: 'file:///' + result.assets[0].uri.split('file:/').join(''),
				name,
				type: mime.getType(result.assets[0].uri) || '',
			};

			setImage(item);
		}
	};

	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useForm<Form>({
		resolver: yupResolver(validationSchema),
		mode: 'onChange',
	});

	const router = useRouter();
	const successFn = () => {
		router.replace('/cpdactivities');
	};

	const { mutate, isPending } = useSelfReport(successFn);

	const { user } = useAuth();

	const onSubmit = (data: Form) => {
		mutate({
			...data,
			event_date: dayjs(new Date(date)).format('YYYY-MM-DDTHH:mm:ssZ[Z] '),
			cpd_evidence: image,
			index_id: user?.id || '',
			category_id,
		});
	};

	return (
		<View style={globalStyles.container}>
			<KeyboardAvoidingView behavior='position'>
				<View
					style={[
						styles.center,
						{
							height: height * 0.35,
						},
					]}>
					<Image
						source={require('../../assets/images/cpdlarge.png')}
						style={{
							width: usableWidth,
							height: height * 0.25,
						}}
					/>
				</View>

				<View style={{ height: height * 0.6 }}>
					<View style={[styles.container]}>
						<Pressable onPress={() => pickImage('cpd_evidence')}>
							<TextInput
								label='CPD Evidence'
								left={<TextInput.Icon icon='subtitles' />}
								right={
									<TextInput.Icon
										onPress={() => pickImage('cpd_evidence')}
										icon={() => (
											<Image
												source={image?.uri}
												style={{
													width: 50,
													height: 50,
												}}
											/>
										)}
									/>
								}
								mode='outlined'
								editable={false}
								onPressIn={() => pickImage('cpd_evidence')}
								{...textProps}
							/>
						</Pressable>
					</View>
					<View style={styles.container}>
						<Controller
							control={control}
							rules={{
								required: true,
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<TextInput
									label='Event Title'
									left={<TextInput.Icon icon='doctor' />}
									mode='outlined'
									{...textProps}
									onChangeText={onChange}
									onBlur={onBlur}
									value={value}
									error={!!errors?.event_title?.message}
								/>
							)}
							name='event_title'
						/>
						{!!errors?.event_title?.message && (
							<Text style={styles.errorText}>
								{errors?.event_title?.message}
							</Text>
						)}
					</View>
					<View style={styles.container}>
						<Controller
							control={control}
							rules={{
								required: true,
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<TextInput
									mode='outlined'
									label='Event Location'
									{...textProps}
									left={<TextInput.Icon icon='bus-marker' />}
									value={value}
									onBlur={onBlur}
									onChangeText={onChange}
									error={!!errors?.event_location?.message}
								/>
							)}
							name='event_location'
						/>

						{!!errors?.event_location?.message && (
							<Text style={styles.errorText}>
								{errors?.event_location?.message}
							</Text>
						)}
					</View>
					<View style={styles.container}>
						<Pressable onPress={togglePicker}>
							<TextInput
								label='Event Date'
								left={<TextInput.Icon icon='clock' />}
								mode='outlined'
								{...textProps}
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
					<View style={[styles.container]}>
						<Button
							style={styles.button}
							mode='contained'
							onPress={handleSubmit(onSubmit)}
							loading={isPending}>
							Report
						</Button>
					</View>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
};

export default CPDSelfReportingComponent;

const styles = StyleSheet.create({
	center: {
		justifyContent: 'center',
		alignItems: 'center',
	},

	input: {
		backgroundColor: '#f9f9f9',
	},

	container: {
		padding: 10,
	},

	button: {
		borderRadius: 5,
		backgroundColor: primaryColor,
	},

	errorText: {
		color: '#ff5252',
		fontSize: 10,
		margin: 5,
	},
});