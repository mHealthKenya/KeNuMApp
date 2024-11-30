import {useRouter} from 'expo-router';
import {useAtom} from 'jotai';
import React, {useEffect, useMemo, useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, Text, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {Button, TextInput, TextInputProps} from 'react-native-paper';
import {employmentAtom} from '../../../atoms/employment';
import {outmigrationAtom} from '../../../atoms/outmigration';
import {personalDetailsAtom} from '../../../atoms/personaldetails';
import useAuthenticatedUser from '../../../services/auth/authenticated';
import useOutmigrationApply from '../../../services/outmigration/apply';
import useMaritalStatus from '../../../services/outmigration/maritalstatus';
import ProgressTrack from '../../shared/Progress';

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

	const {data: user} = useAuthenticatedUser();

	const [disabled, setDisabled] = useState(true);

	const [maritalStatus, setMaritalStatus] = useState<string | null>(null);

	const [dependents, setDependents] = useState<string | null>(null);

	const [dropMarital, setDropMarital] = useState(false);

	const router = useRouter();

	const handleDependents = (dependents: string) => {
		setDependents(dependents);
	};

	const [personalDetails, setPersonalDetails] = useAtom(personalDetailsAtom);

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

	const [employmentDetails, setEmploymentDetails] = useAtom(employmentAtom);
	const [outmigration, setOutmigration] = useAtom(outmigrationAtom);

	const successFn = () => {
		setPersonalDetails(null);
		setEmploymentDetails(null);
		setOutmigration(null);
		router.replace('/outmigrationhist');
	};

	const errorFn = () => {
		console.log('error');
	};

	const {mutate, isPending} = useOutmigrationApply(successFn, errorFn);

	const handleSubmit = () => {
		mutate({
			index_id: user?.id || '',
			country_id: outmigration?.country_id || '',
			marital_status: maritalStatus || '',
			employment_status: employmentDetails?.employment_status || '',
			current_employer: employmentDetails?.current_employer || '',
			current_position: employmentDetails?.current_position || '',
			dependants: dependents || '',
			department: employmentDetails?.department || '',
			form_attached: {
				name: outmigration?.form_attached?.assets![0].name || '',
				uri: outmigration?.form_attached?.assets![0].uri || '',
				type: outmigration?.form_attached?.assets![0].mimeType || '',
			} as unknown as Blob,
			workstation_type: employmentDetails?.workstation_type || '',
			workstation_id: employmentDetails?.workstation_id || '',
			workstation_name: employmentDetails?.workstation_name || '',
			duration_current_employer: employmentDetails?.duration_current_employer || '',
			experience_years: employmentDetails?.experience_years || '',
			planning_return: outmigration?.planning_return || '',
			verification_cadres: outmigration?.verification_cadres || '',
			outmigration_reason: outmigration?.outmigration_reason || '',
		});

		// setSubmit(false);
	};

	return (
		<View className='flex flex-1'>
			<View className='mx-5'>
				<KeyboardAvoidingView behavior='position'>
					<View className='p-2 items-center'>
						<Text>Step 3 of 3</Text>
					</View>
					<View className='p-2 mb-4 items-center'>
						<ProgressTrack progress={3 / 3} />
					</View>
					<View className='p-2 flex flex-grow' style={styles.status}>
						<DropDownPicker
							items={marital || []}
							value={maritalStatus}
							setValue={setMaritalStatus}
							multiple={false}
							zIndex={1000}
							open={dropMarital}
							placeholder='Marital Status'
							placeholderStyle={{
								fontSize: 16,
								fontFamily: 'normal',
							}}
							textStyle={{
								fontFamily: 'normal',
							}}
							setOpen={setDropMarital}
							style={[
								styles.input,
								{
									borderColor: dropMarital ? '#0445b5' : '#0345B53D',
								},
							]}
							listMode='SCROLLVIEW'
							loading={isLoading}
						/>
					</View>
					<View className='p-2'>
						<TextInput
							label={<Text>Number of Dependants</Text>}
							mode='outlined'
							defaultValue={personalDetails?.dependants}
							onChangeText={handleDependents}
							{...textInputProps}
						/>
					</View>
					<View className='p-2'>
						<Button
							mode='contained'
							style={disabled || isPending ? styles.disabled : styles.button}
							disabled={disabled || isPending}
							onPress={handleSubmit}
							loading={isPending}>
							Submit
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

	status: {
		...Platform.select({
			ios: {
				zIndex: 1000,
			},
		}),
	},
});

export default PersonalDetailsComponent;
