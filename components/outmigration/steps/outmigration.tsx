import * as DocumentPicker from 'expo-document-picker';
import {useRouter} from 'expo-router';
import {useAtom} from 'jotai';
import React, {useEffect, useMemo, useState} from 'react';
import {Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {KeyboardAwareScrollView, KeyboardToolbar} from 'react-native-keyboard-controller';
import {Button, Icon, TextInput, TextInputProps} from 'react-native-paper';
import {employmentAtom} from '../../../atoms/employment';
import {outmigrationAtom} from '../../../atoms/outmigration';
import {personalDetailsAtom} from '../../../atoms/personaldetails';
import {truncateText} from '../../../helpers/truncate';
import useAuthenticatedUser from '../../../services/auth/authenticated';
import useCountries from '../../../services/general/countries';
import useOutmigrationApply from '../../../services/outmigration/apply';
import usePlanningToReturn from '../../../services/outmigration/planningtoreturn';
import useOutmigrationReasons from '../../../services/outmigration/reasons';
import ProgressTrack from '../../shared/Progress';

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

	const router = useRouter();

	const [outmigration, setOutmigration] = useAtom(outmigrationAtom);
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

	const successFn = () => {
		setPersonalDetails(null);
		setEmploymentDetails(null);
		setOutmigration(null);
		router.push('/outmigrationhist');
	};

	const errorFn = () => {
		console.log('error');
	};

	const [_, setPersonalDetails] = useAtom(personalDetailsAtom);
	const [__, setEmploymentDetails] = useAtom(employmentAtom);

	const {isPending} = useOutmigrationApply(successFn, errorFn);

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
		const result = await DocumentPicker.getDocumentAsync({
			type: 'application/pdf',
		});
		setSelectedFile(result);
	};

	useEffect(() => {
		setOutReasons(outmigration?.outmigration_reason || null);
		setOutCountry(outmigration?.country_id || null);
		setReturnValue(outmigration?.planning_return || null);
		setEducVal(outmigration?.verification_cadres.split(',') || null);
		setSelectedFile(outmigration?.form_attached || null);
	}, [outmigration]);

	useEffect(() => {
		setDisabled(!(outReasons && outCountry && returnValue && educVal && selectedFile));
	}, [outReasons, outCountry, returnValue, educVal, selectedFile]);

	const handleNext = () => {
		setOutmigration({
			...outmigration,
			outmigration_reason: outReasons!,
			country_id: outCountry!,
			planning_return: returnValue!,
			verification_cadres: educVal!.join(','),
			form_attached: selectedFile!,
		});

		router.push('/employmentdetails');

		// setSubmit(true);
	};

	return (
		<>
			<KeyboardAwareScrollView bottomOffset={62} contentContainerStyle={{padding: 16, gap: 16}}>
				<View className='p-2 items-center'>
					<Text>Step 1 of 3</Text>
				</View>
				<View className='p-2 mb-4 items-center'>
					<ProgressTrack progress={33} />
				</View>
				<View className='p-3'>
					<View className='p-2' style={styles.outmigration}>
						<DropDownPicker
							items={outmigrationReasons || []}
							value={outReasons}
							setValue={setOutReasons}
							multiple={false}
							zIndex={4000}
							open={reasonsDrop}
							placeholder='Outmigration Reason'
							searchable
							placeholderStyle={{
								fontSize: 16,
								fontFamily: 'normal',
								color: '#A9A9A9',
							}}
							textStyle={{
								fontFamily: 'normal',
							}}
							scrollViewProps={{
								nestedScrollEnabled: true,
							}}
							setOpen={setReasonsDrop}
							style={[
								styles.input,
								{
									borderColor: reasonsDrop ? '#0445b5' : '#0345B53D',
								},
							]}
							listMode='SCROLLVIEW'
							loading={loadingReasons}
						/>
					</View>

					<View className='p-2' style={styles.country}>
						<DropDownPicker
							items={allCountries || []}
							value={outCountry}
							setValue={setOutCountry}
							multiple={false}
							zIndex={3000}
							open={countryDrop}
							placeholder='Outmigration Country'
							searchable
							placeholderStyle={{
								fontSize: 16,
								fontFamily: 'normal',
								color: '#A9A9A9',
							}}
							textStyle={{
								fontFamily: 'normal',
							}}
							setOpen={setCountryDrop}
							style={[
								styles.input,
								{
									borderColor: countryDrop ? '#0445b5' : '#0345B53D',
								},
							]}
							listMode='SCROLLVIEW'
							loading={loadingCountries}
						/>
					</View>

					<View className='p-2' style={styles.return}>
						<DropDownPicker
							items={planningToReturn || []}
							value={returnValue}
							setValue={setReturnValue}
							multiple={false}
							zIndex={2000}
							open={returnDrop}
							placeholder='Planning To Return'
							placeholderStyle={{
								fontSize: 16,
								fontFamily: 'normal',
								color: '#A9A9A9',
							}}
							textStyle={{
								fontFamily: 'normal',
							}}
							setOpen={setReturnDrop}
							style={[
								styles.input,
								{
									borderColor: returnDrop ? '#0445b5' : '#0345B53D',
								},
							]}
							listMode='SCROLLVIEW'
							loading={loadingReturning}
						/>
					</View>

					<View className='p-2' style={styles.cadre}>
						<DropDownPicker
							items={education || []}
							value={educVal}
							setValue={setEducVal}
							multiple={true}
							zIndex={1000}
							open={educDrop}
							placeholder='Cadres To Verify'
							placeholderStyle={{
								fontSize: 16,
								fontFamily: 'normal',
								color: '#A9A9A9',
							}}
							textStyle={{
								fontFamily: 'normal',
							}}
							setOpen={setEducDrop}
							style={[
								styles.input,
								{
									borderColor: educDrop ? '#0445b5' : '#0345B53D',
								},
							]}
							listMode='SCROLLVIEW'
							loading={isLoading}
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

					<View className='p-2'>
						<Button
							mode='contained'
							style={disabled ? styles.disabled : styles.button}
							disabled={disabled}
							onPress={handleNext}
							loading={isPending}>
							Next
						</Button>
					</View>
				</View>
			</KeyboardAwareScrollView>
			<KeyboardToolbar />
		</>
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

	outmigration: {
		...Platform.select({
			ios: {
				zIndex: 4000,
			},
		}),
	},

	country: {
		...Platform.select({
			ios: {
				zIndex: 3000,
			},
		}),
	},

	return: {
		...Platform.select({
			ios: {
				zIndex: 2000,
			},
		}),
	},

	cadre: {
		...Platform.select({
			ios: {
				zIndex: 1000,
			},
		}),
	},

	checkboxBase: {
		width: 24,
		height: 24,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 4,
		borderWidth: 2,
		borderColor: 'coral',
		backgroundColor: 'transparent',
	},
	checkboxChecked: {
		backgroundColor: 'coral',
	},
	appContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	appTitle: {
		marginVertical: 16,
		fontWeight: 'bold',
		fontSize: 24,
	},
	checkboxContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	checkboxLabel: {
		marginLeft: 8,
		fontWeight: '500',
		fontSize: 18,
	},

	buttonDisabled: {
		backgroundColor: '#A9A9A9', // Disabled button color
	},
});

export default OutmigrationStepComponent;
