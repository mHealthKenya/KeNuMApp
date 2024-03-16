import {View, Text, KeyboardAvoidingView, useWindowDimensions, ActivityIndicator} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import useMaritalStatus from '../../../services/outmigration/maritalstatus';
import DropDownPicker from 'react-native-dropdown-picker';
import {StyleSheet} from 'react-native';
import {Button, TextInput, TextInputProps} from 'react-native-paper';
import ProgressTrack from '../../shared/Progress';
import {useAtom} from 'jotai';
import {personalDetailsAtom} from '../../../atoms/personaldetails';
import {MaritalStatus} from '../../../models/maritalstatus';
import {useRouter} from 'expo-router';

const PersonalDetailsComponent = () => {
	const theme = {
		roundness: 12,
	};

	const textInputProps: TextInputProps = {
		theme: theme,
		style: styles.input,
		outlineColor: '#0345B53D',
		activeOutlineColor: '#0445b5',
	};
	const {data: status, isLoading} = useMaritalStatus();

	const [disabled, setDisabled] = useState(true);

	const [maritalStatus, setMaritalStatus] = useState<string | null>(null);

	const [dependents, setDependents] = useState<string | null>(null);

	const [dropMarital, setDropMarital] = useState(false);

	const {height} = useWindowDimensions();

	const router = useRouter();

	const handleDependents = (dependents: string) => {
		setDependents(dependents);
	};

	const [personalDetails, setPersonalDetails] = useAtom(personalDetailsAtom);

	const handleNext = () => {
		setPersonalDetails({
			marital_status: maritalStatus!,
			dependants: dependents!,
		});

		router.push('/employmentdetails');
	};

	useEffect(() => {
		setMaritalStatus(personalDetails?.marital_status || null);
		setDependents(personalDetails?.dependants || null);
	}, [personalDetails]);

	useEffect(() => {
		if (maritalStatus && dependents) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [maritalStatus, dependents, personalDetails]);

	const marital = useMemo(
		() =>
			status?.marital_status_types?.map((item) => ({
				label: item.marital_status_type,
				value: item.id,
			})),
		[status]
	);

	if (isLoading) {
		return (
			<View className='flex flex-1 justify-center items-center'>
				<ActivityIndicator />
			</View>
		);
	}

	return (
		<View className='flex flex-1'>
			<View className='mx-5'>
				<KeyboardAvoidingView behavior='position'>
					<View className='p-2'>
						<Text>Step 1 of 3</Text>
					</View>
					<View className='p-2 mb-4'>
						<ProgressTrack progress={1 / 3} />
					</View>
					<View
						className='p-2 flex flex-grow'
						style={{
							height: dropMarital ? height * 0.22 : height * 0.07,
						}}>
						<DropDownPicker
							items={marital || []}
							value={maritalStatus}
							setValue={setMaritalStatus}
							multiple={false}
							open={dropMarital}
							placeholder='Marital Status'
							placeholderStyle={{
								fontSize: 16,
								color: '#7b7e81',
							}}
							setOpen={setDropMarital}
							style={[
								styles.input,
								{
									borderColor: dropMarital ? '#0445b5' : '#0345B53D',
								},
							]}
							listMode='SCROLLVIEW'
						/>
					</View>
					<View className='p-2'>
						<TextInput
							label={
								<Text
									style={{
										color: '#0000004F',
									}}>
									Number of Dependants
								</Text>
							}
							mode='outlined'
							defaultValue={personalDetails?.dependants}
							onChangeText={handleDependents}
							{...textInputProps}
						/>
					</View>
					<View className='p-2'>
						<Button
							mode='contained'
							style={disabled ? styles.disabled : styles.button}
							disabled={disabled}
							onPress={handleNext}>
							Next
						</Button>
					</View>
				</KeyboardAvoidingView>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	input: {
		backgroundColor: '#f9f9f9',
	},
	button: {
		backgroundColor: '#0445b5',
		borderRadius: 12,
		padding: 3,
	},

	disabled: {
		backgroundColor: '#bbbbbb',
		borderRadius: 12,
		padding: 3,
	},
});

export default PersonalDetailsComponent;
