import dayjs from 'dayjs';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import React, { FC, useEffect, useMemo, useState } from 'react';
import mime from 'mime';
import {
	KeyboardAvoidingView,
	Platform,
	Pressable,
	StyleSheet,
	View,
	useWindowDimensions,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button, TextInput, TextInputProps } from 'react-native-paper';
import { primaryColor } from '../../constants/Colors';
import { InternshipCenters } from '../../models/internshipcenters';
import globalStyles from '../../styles/global';
import DateModal from '../shared/DateModal';
import useInternshipApply from '../../services/internship/apply';
import { User } from '../../models/user';
import { useRouter } from 'expo-router';

enum Names {
	posting_letter = 'posting_letter',
	degree_cert = 'degree_cert',
}

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
}> = ({ centers, user }) => {
	const textProps: TextInputProps = {
		theme,
		style: styles.input,
		outlineColor: '#f9f9f9',
		activeOutlineColor: '#0445b5',
	};
	const { width, height } = useWindowDimensions();

	const router = useRouter();

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

	const [images, setImages] = useState<UserImage[]>([]);

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
			const index = images.findIndex((item) => item.name === name);

			if (index !== -1) {
				const nList = [...images];
				nList[index] = {
					uri: 'file:///' + result.assets[0].uri.split('file:/').join(''),
					name,
					type: mime.getType(result.assets[0].uri) || '',
				};

				setImages(nList);
			} else {
				setImages([
					...images,
					{
						name,
						uri: 'file:///' + result.assets[0].uri.split('file:/').join(''),
						type: mime.getType(result.assets[0].uri) || '',
					},
				]);
			}
		}
	};

	const items = useMemo(
		() =>
			centers?.internship_centers?.map((center) => ({
				label: center.internship_center,
				value: center.id,
			})),
		[centers]
	);

	const { mutate, isPending, isSuccess, reset } = useInternshipApply();
	const handleSubmit = async () => {
		const degree_cert = images[0];

		const posting_letter = images[1];

		const education_id =
			user?.education !== undefined
				? user?.education[user?.education.length - 1].education_id
				: '';

		mutate({
			start_date: dayjs(date).format('YYYY-MM-DD'),
			internship_center: selected || '',
			degree_cert,
			posting_letter,
			education_id: '' + education_id,
		});
	};

	useEffect(() => {
		if (isSuccess) {
			router.push('/internshippay');
		}

		return () => {
			reset();
		};
	}, [isSuccess]);

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
				<Pressable onPress={() => pickImage(Names.posting_letter)}>
					<TextInput
						label='Posting Letter'
						left={<TextInput.Icon icon='hospital-building' />}
						right={
							<TextInput.Icon
								onPress={() => pickImage(Names.posting_letter)}
								icon={() => (
									<Image
										source={
											images?.filter(
												(item) => item.name === Names.posting_letter
											)[0]?.uri || ''
										}
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
						onPressIn={() => pickImage(Names.posting_letter)}
						{...textProps}
					/>
				</Pressable>

				<Pressable onPress={() => pickImage(Names.degree_cert)}>
					<TextInput
						label='Degree Certificate'
						left={<TextInput.Icon icon='certificate' />}
						right={
							<TextInput.Icon
								onPress={() => pickImage(Names.degree_cert)}
								icon={() => (
									<Image
										source={
											images?.filter(
												(item) => item.name === Names.degree_cert
											)[0]?.uri || ''
										}
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
						onPressIn={() => pickImage(Names.degree_cert)}
						{...textProps}
					/>
				</Pressable>

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

				<Button
					mode='contained'
					style={styles.button}
					onPress={handleSubmit}
					loading={isPending}>
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
