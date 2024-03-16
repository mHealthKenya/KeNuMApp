import * as DocumentPicker from 'expo-document-picker';
import React, {useEffect, useMemo, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {Button, Icon, TextInput, TextInputProps} from 'react-native-paper';
import useAuthenticatedUser from '../../../services/auth/authenticated';
import useCountries from '../../../services/general/countries';
import usePlanningToReturn from '../../../services/outmigration/planningtoreturn';
import useOutmigrationReasons from '../../../services/outmigration/reasons';
import ProgressTrack from '../../shared/Progress';
import {truncateText} from '../../../helpers/truncate';
import {useAtom} from 'jotai';
import {outmigrationAtom} from '../../../atoms/outmigration';
import {personalDetailsAtom} from '../../../atoms/personaldetails';
import {employmentAtom} from '../../../atoms/employment';
import useOutmigrationApply from '../../../services/outmigration/apply';

const theme = {
	roundness: 12,
};

const OutmigrationStepComponent = () => {
	const textInputProps: TextInputProps = {
		theme: theme,
		style: styles.input,
		outlineColor: '#0345B53D',
		activeOutlineColor: '#0445b5',
	};

	const [outmigration, setOutmigration] = useAtom(outmigrationAtom);
	const {height} = useWindowDimensions();
	const {data: countries, isLoading: loadingCountries} = useCountries();
	const {data: reasons, isLoading: loadingReasons} = useOutmigrationReasons();
	const {data: returning, isLoading: loadingReturning} = usePlanningToReturn();
	const {data: user, isLoading} = useAuthenticatedUser();

	const [outReasons, setOutReasons] = useState<string | null>(null);
	const [reasonsDrop, setReasonsDrop] = useState(false);

	const [outCountry, setOutCountry] = useState<string | null>(null);
	const [countryDrop, setCountryDrop] = useState(false);

	const [returnValue, setReturnValue] = useState<string | null>(null);
	const [returnDrop, setReturnDrop] = useState(false);

	const [educVal, setEducVal] = useState<string[] | null>(null);
	const [educDrop, setEducDrop] = useState(false);

	const [selectedFile, setSelectedFile] = useState<DocumentPicker.DocumentPickerResult | null>(null);

	const [disabled, setDisabled] = useState(true);

	const [submit, setSubmit] = useState(false);

	const successFn = () => {
		console.log('success');
	};

	const errorFn = () => {
		console.log('error');
	};

	const [personalDetails, setPersonalDetails] = useAtom(personalDetailsAtom);
	const [employmentDetails, setEmploymentDetails] = useAtom(employmentAtom);

	const {mutate, isPending} = useOutmigrationApply(successFn, errorFn);

	const outmigrationReasons = useMemo(
		() =>
			reasons?.outmigration_reasons?.map((item) => ({
				label: item.reason,
				value: item.id,
			})),
		[reasons]
	);

	const allCountries = useMemo(
		() =>
			countries?.countries?.map((item) => ({
				label: item.country,
				value: item.id,
			})),
		[countries]
	);

	const planningToReturn = useMemo(
		() =>
			returning?.planning_to_return?.map((item) => ({
				label: item.type,
				value: item.id,
			})),
		[returning]
	);

	const education = useMemo(
		() =>
			user?.education?.map((item) => ({
				label: item?.cadre_text,
				value: item?.cadre_text,
			})),
		[user]
	);

	const pickDocument = async () => {
		let result = await DocumentPicker.getDocumentAsync({
			type: 'application/pdf',
		});
		setSelectedFile(result);
	};

	useEffect(() => {
		setDisabled(!(outReasons && outCountry && returnValue && educVal && selectedFile));
	}, [outReasons, outCountry, returnValue, educVal, selectedFile]);

	useEffect(() => {
		setOutReasons(outmigration?.outmigration_reason || null);
		setOutCountry(outmigration?.country_id || null);
		setReturnValue(outmigration?.planning_return || null);
		setEducVal(outmigration?.verification_cadres.split(',') || null);
		setSelectedFile(outmigration?.form_attached || null);
	}, [outmigration]);

	const handleNext = () => {
		setOutmigration({
			...outmigration,
			outmigration_reason: outReasons!,
			country_id: outCountry!,
			planning_return: returnValue!,
			verification_cadres: educVal!.join(','),
			form_attached: selectedFile!,
		});

		setSubmit(true);
	};

	const handleSubmit = () => {
		mutate({
			index_id: user?.id || '',
			country_id: outmigration?.country_id || '',
			marital_status: personalDetails?.marital_status || '',
			employment_status: employmentDetails?.employment_status || '',
			current_employer: employmentDetails?.current_employer || '',
			current_position: employmentDetails?.current_position || '',
			dependants: personalDetails?.dependants || '',
			department: employmentDetails?.department || '',
			form_attached: outmigration?.form_attached || null,
			workstation_type: employmentDetails?.workstation_type || '',
			workstation_id: employmentDetails?.workstation_id || '',
			workstation_name: employmentDetails?.workstation_name || '',
			duration_current_employer: employmentDetails?.duration_current_employer || '',
			experience_years: employmentDetails?.experience_years || '',
			planning_return: outmigration?.planning_return || '',
			verification_cadres: outmigration?.verification_cadres || '',
			outmigration_reason: outmigration?.outmigration_reason || '',
		});

		setSubmit(false);
		setPersonalDetails(null);
		setEmploymentDetails(null);
		setOutmigration(null);
	};

	useEffect(() => {
		if (submit) {
			handleSubmit();
		}

		return () => {
			setSubmit(false);
		};
	}, [submit]);

	return (
		<View
			style={{
				flex: 1,
			}}>
			<ScrollView
				nestedScrollEnabled={true}
				style={{
					paddingBottom: 20,
				}}>
				<View className='p-2 items-center'>
					<Text>Step 3 of 3</Text>
				</View>
				<View className='p-2 mb-4 items-center'>
					<ProgressTrack progress={3 / 3} />
				</View>
				<View
					className='p-2'
					style={{
						height: reasonsDrop ? height * 0.3 : height * 0.07,
					}}>
					<DropDownPicker
						items={outmigrationReasons || []}
						value={outReasons}
						setValue={setOutReasons}
						multiple={false}
						open={reasonsDrop}
						placeholder='Outmigration Reason'
						searchable
						placeholderStyle={{
							fontSize: 16,
							color: '#7b7e81',
						}}
						setOpen={setReasonsDrop}
						style={[
							styles.input,
							{
								borderColor: reasonsDrop ? '#0445b5' : '#0345B53D',
							},
						]}
						listMode='SCROLLVIEW'
					/>
				</View>

				<View
					className='p-2'
					style={{
						height: countryDrop ? height * 0.3 : height * 0.07,
					}}>
					<DropDownPicker
						items={allCountries || []}
						value={outCountry}
						setValue={setOutCountry}
						multiple={false}
						open={countryDrop}
						placeholder='Outmigration Country'
						searchable
						placeholderStyle={{
							fontSize: 16,
							color: '#7b7e81',
						}}
						setOpen={setCountryDrop}
						style={[
							styles.input,
							{
								borderColor: countryDrop ? '#0445b5' : '#0345B53D',
							},
						]}
						listMode='SCROLLVIEW'
					/>
				</View>

				<View
					className='p-2'
					style={{
						height: returnDrop ? height * 0.22 : height * 0.07,
					}}>
					<DropDownPicker
						items={planningToReturn || []}
						value={returnValue}
						setValue={setReturnValue}
						multiple={false}
						open={returnDrop}
						placeholder='Planning To Return'
						placeholderStyle={{
							fontSize: 16,
							color: '#7b7e81',
						}}
						setOpen={setReturnDrop}
						style={[
							styles.input,
							{
								borderColor: returnDrop ? '#0445b5' : '#0345B53D',
							},
						]}
						listMode='SCROLLVIEW'
					/>
				</View>
				<View
					className='p-2'
					style={{
						height: educDrop ? height * 0.28 : height * 0.07,
					}}>
					<DropDownPicker
						items={education || []}
						value={educVal}
						setValue={setEducVal}
						multiple={true}
						open={educDrop}
						placeholder='Cadres To Verify'
						placeholderStyle={{
							fontSize: 16,
							color: '#7b7e81',
						}}
						setOpen={setEducDrop}
						style={[
							styles.input,
							{
								borderColor: educDrop ? '#0445b5' : '#0345B53D',
							},
						]}
						listMode='SCROLLVIEW'
					/>
				</View>

				<View className='p-2'>
					{educVal?.map((item) => (
						<View className='flex flex-row space-x-3' key={item}>
							<View className='justify-center'>
								<Icon source='check-circle' size={25} color='green' />
							</View>

							<View className='justify-center'>
								<Text className='tracking-widest p-2'>{item}</Text>
							</View>
						</View>
					))}
				</View>

				<View className='p-2'>
					<View>
						<Pressable onPress={() => pickDocument()}>
							<TextInput
								label={
									selectedFile?.assets
										? truncateText({
												text: selectedFile?.assets[0].name,
												length: 30,
										  })
										: 'Verification Form'
								}
								left={<TextInput.Icon icon='subtitles' />}
								mode='outlined'
								editable={false}
								onPressIn={() => pickDocument()}
								{...textInputProps}
							/>
						</Pressable>
					</View>
				</View>
				<View className='p-2'>
					<Button
						mode='contained'
						style={disabled ? styles.disabled : styles.button}
						disabled={disabled}
						onPress={handleNext}
						loading={isPending}>
						Submit Application
					</Button>
				</View>
			</ScrollView>
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

export default OutmigrationStepComponent;
