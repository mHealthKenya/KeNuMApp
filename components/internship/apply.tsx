import {useToast} from '@gluestack-ui/themed';
import dayjs from 'dayjs';
import * as DocumentPicker from 'expo-document-picker';
import {Image} from 'expo-image';
import {useRouter} from 'expo-router';
import React, {FC, useMemo, useState} from 'react';
import {KeyboardAvoidingView, Platform, Pressable, StyleSheet, View, useWindowDimensions} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {Button, Icon, TextInput, TextInputProps} from 'react-native-paper';
import {primaryColor} from '../../constants/Colors';
import {truncateText} from '../../helpers/truncate';
import {InternshipCenters} from '../../models/internshipcenters';
import {User} from '../../models/user';
import useInternshipApply from '../../services/internship/apply';
import globalStyles from '../../styles/global';
import DateModal from '../shared/DateModal';
import ToastError from '../shared/ToastError';
import WarnAlert from '../shared/WarnAlert';
import {Text} from 'react-native';

interface UserImage {
	uri: string | null;
	name: string;
	type?: string;
}

const theme = {
	roundness: 10,
};

const InternshipApplyComponent: FC<{
	centers: InternshipCenters;
	user: User | null;
}> = ({centers, user}) => {
	if (user?.education !== undefined && user?.education?.length <= 0) {
		return <WarnAlert message='Could not find any education history in your account' />;
	}

	const textProps: TextInputProps = {
		theme,
		style: styles.input,
		outlineColor: '#f9f9f9',
		activeOutlineColor: '#0445b5',
	};
	const {width, height} = useWindowDimensions();

	const router = useRouter();

	const toast = useToast();

	const dimension = Math.min(width, height);

	const availableWidth = dimension - 30;

	const usableWidth = (availableWidth - 20) / 3;

	const [picker, setPicker] = useState(false);

	const togglePicker = () => {
		setPicker(!picker);
	};

	const [date, setDate] = useState(new Date());

	const [dropDown, setDropDown] = useState(false);

	const [selected, setSelected] = useState(null);

	const [selectedFile, setSelectedFile] = useState<DocumentPicker.DocumentPickerResult>();

	const [selectedDegree, setSelectedDegree] = useState<DocumentPicker.DocumentPickerResult>();

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

	const pickDegree = async () => {
		let result = await DocumentPicker.getDocumentAsync({
			multiple: false,
			type: ['application/pdf'],
		});
		setSelectedDegree(result);
	};

	const pickPostingLetter = async () => {
		let result = await DocumentPicker.getDocumentAsync({
			multiple: false,
			type: ['application/pdf'],
		});
		setSelectedFile(result);
	};

	const items = useMemo(
		() =>
			centers?.internship_centers?.map((center) => ({
				label: center.internship_center,
				value: center.id,
			})),
		[centers]
	);

	const successFn = () => {
		router.push('/internshiphistory');
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
						description='Could not complete internship application. Please retry later'
					/>
				);
			},
			placement: 'top',
		});
	};

	const {mutate, isPending} = useInternshipApply(successFn, errorFn);
	const handleSubmit = async () => {
		const degree_cert = {
			name: selectedDegree?.assets![0].name || '',
			uri: selectedDegree?.assets![0].uri || '',
			type: selectedDegree?.assets![0].mimeType || '',
		};

		const posting_letter = {
			name: selectedFile?.assets![0].name || '',
			uri: selectedFile?.assets![0].uri || '',
			type: selectedFile?.assets![0].mimeType || '',
		};

		const education_id = user?.education !== undefined ? user?.education[user?.education.length - 1].education_id : '';

		mutate({
			start_date: dayjs(date).format('YYYY-MM-DD'),
			internship_center: selected || '',
			degree_cert,
			posting_letter,
			education_id: '' + education_id,
		});
	};

	return (
		<KeyboardAvoidingView style={[globalStyles.container]} behavior='position'>
			<View
				style={[
					{
						width: '100%',
						height: height * 0.3,
					},
					styles.center,
				]}>
				<Image
					source={require('../../assets/images/nurselarge.png')}
					style={{
						width: usableWidth,
						height: height * 0.25,
					}}
				/>
			</View>
			<View className='flex px-10 py-2'>
				<View className='flex flex-row gap-1 items-center bg-slate-200 rounded-lg p-1 justify-center'>
					<Text>Upload required documents</Text>
					<View className='bg-red-500 rounded-lg p-1'>
						<Text className='text-white'>in PDF format only</Text>
					</View>
				</View>
			</View>

			<View
				style={[
					styles.spacer,
					{
						height: height * 0.5,
						justifyContent: 'space-around',
					},
				]}>
				<DropDownPicker
					items={items || []}
					value={selected}
					setValue={setSelected}
					multiple={false}
					open={dropDown}
					placeholder='Select a facility'
					placeholderStyle={{
						fontSize: 16,
					}}
					searchable
					setOpen={setDropDown}
					style={[
						styles.input,
						{
							borderColor: dropDown ? '#0445b5' : '#f9f9f9',
						},
					]}
				/>
				<View>
					<View>
						<Pressable onPress={() => pickPostingLetter()}>
							<TextInput
								label={
									selectedFile?.assets
										? truncateText({
												text: selectedFile?.assets[0].name,
												length: 30,
										  })
										: 'Posting Letter'
								}
								left={<TextInput.Icon icon='subtitles' />}
								mode='outlined'
								editable={false}
								onPressIn={() => pickPostingLetter()}
								{...textProps}
							/>
						</Pressable>
					</View>
				</View>

				<View>
					<View>
						<Pressable onPress={() => pickDegree()}>
							<TextInput
								label={
									selectedDegree?.assets
										? truncateText({
												text: selectedDegree?.assets[0].name,
												length: 30,
										  })
										: 'Degree Certificate'
								}
								left={<TextInput.Icon icon='subtitles' />}
								mode='outlined'
								editable={false}
								onPressIn={() => pickDegree()}
								{...textProps}
							/>
						</Pressable>
					</View>
				</View>

				<Pressable onPress={togglePicker}>
					<TextInput
						label='Start Date'
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
					/>
				)}

				<Button mode='contained' style={styles.button} onPress={handleSubmit} loading={isPending}>
					Apply
				</Button>
			</View>
		</KeyboardAvoidingView>
	);
};

export default InternshipApplyComponent;

const styles = StyleSheet.create({
	center: {
		justifyContent: 'center',
		alignItems: 'center',
	},

	spacer: {
		margin: 10,
		padding: 20,
	},

	input: {
		backgroundColor: '#f9f9f9',
	},

	cancelButton: {
		backgroundColor: '#abb0bf',
		margin: 5,
		borderRadius: 5,
	},

	okButton: {
		backgroundColor: primaryColor,
		margin: 5,
		borderRadius: 5,
	},

	button: {
		borderRadius: 5,
		backgroundColor: primaryColor,
	},
});
