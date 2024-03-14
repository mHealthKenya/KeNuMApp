import * as DocumentPicker from 'expo-document-picker';
import React, { FC, useEffect, useMemo, useState } from 'react';
import {
	KeyboardAvoidingView,
	Pressable,
	ScrollView,
	StyleSheet,
	View,
	useWindowDimensions,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {
	ActivityIndicator,
	Button,
	Icon,
	Text,
	TextInput,
	TextInputProps,
} from 'react-native-paper';
import {
	employers,
	marital,
	period,
	reasons,
	returning,
	status,
} from '../../data/outmigration';
import { truncateText } from '../../helpers/truncate';
import { County } from '../../models/counties';
import { User } from '../../models/user';
import useEmploymentStatus from '../../services/outmigration/employementstatus';
import { EmploymentStatus } from '../../models/employmentstatus';
import { EmploymentPeriod } from '../../models/employmentperiod';
import { MaritalStatus } from '../../models/maritalstatus';
import { PlanToReturn } from '../../models/plantoreturn';
import { OutMigrationReason } from '../../models/outmigration_reason';
import useApplyOutMigration from '../../services/outmigration/apply';
import { useRouter } from 'expo-router';
import { useToast } from '@gluestack-ui/themed';
import ToastError from '../shared/ToastError';
import dayjs from 'dayjs';
import { WorkStation } from '../../models/workstations';
import * as ImagePicker from 'expo-image-picker';
import mime from 'mime';
import { useAtom } from 'jotai';
import { countAtom } from '../../atoms/county';
import { workStationAtom } from '../../atoms/workstation';
import { Countries, Country } from '../../models/countries';
// import { WorkStationTypes } from '../../models/workStationTypes';
import { WorkStationTypes } from '../../models/workStationTypes';
// import DocumentPicker from 'react-native-document-picker';

const theme = {
	roundness: 12,
};

const ApplyOutComponent: FC<{
	counties: County[];
	countries: Country[] ;
	workstationType: WorkStationTypes | undefined
	user: User;
	employmentStatus: EmploymentStatus | undefined;
	employmentPeriod: EmploymentPeriod | undefined;
	marital_status: MaritalStatus | undefined;
	planToReturn: PlanToReturn | undefined;
	reasonToApply: OutMigrationReason | undefined;
	workstations: WorkStation[];
	loadingStations?: boolean,
}> = ({ counties, countries, user, employmentStatus, employmentPeriod, marital_status, planToReturn, reasonToApply, workstations, loadingStations, workstationType }) => {
	const [educVal, setEducVal] = useState<string[] | null>(null);

	const education = useMemo(
		() =>
			user?.education?.map((item) => ({
				label: item?.cadre_text,
				value: item?.education_id
			})),
		[user]
	);

	const actual = useMemo(
		() =>
			counties.map((item) => ({
				label: item.County,
				value: item.id,
			})),
		[counties]
	);

	const countryData = useMemo(() => {
		return countries.map((item) => ({
			label: item.country,
			value: item.id,
		}))
	}, [countries])

	
	const workStationTypeData = useMemo(() => {
		return workstationType?.workstation_types?.map((item: any) => ({
      label: item.type,
      value: item.id,
    }))
	}, [workstationType])

	


	const employementstatusData  = useMemo(() => {
  
    return employmentStatus?.employment_status?.map((item) => ({
        label: item.status,
        value: item.id,
    }));
}, [employmentStatus]);

	const employmentPeriodData = useMemo(() => {
		return employmentPeriod?.employment_periods?.map((item) => ({
			label: item.period,
			value: item.id,
		}));
	}, [employmentPeriod])

	const maritalStatusData = useMemo(() => {
		return marital_status?.marital_status_types.map((items) => ({
			label: items.marital_status_type,
      value: items.id,
		}))
	}, [marital_status])

	const planToReturnData = useMemo(() => {
		return planToReturn?.planning_to_return?.map((item) => ({
      label: item.type,
      value: item.id,
    }))
	}, [planToReturn])

	const reasonToApplyData = useMemo(() => {
		return reasonToApply?.outmigration_reasons?.map((item) => ({
      label: item.reason,
      value: item.id,
    }))
	}, [reasonToApply])

	const workstationData = useMemo(() => {
		return workstations?.map((item) => ({
			label: item.workstation,
      value: item.id,
		}))
	}, [workstations])

	



	// const [county, setCounty] = useState(null);
	const [station, setStation] = useState('')
	const [county, setCounty] = useState(null);
	const [selectedFile, setSelectedFile] =
		useState<DocumentPicker.DocumentPickerResult>();
	const [maritalStatus, setMaritalStatus] = useState(null);
	const [outReasons, setOutReasons] = useState(null);
	const [statusE, setStatusE] = useState(null);
	const [dependants, setDependants] = useState('');
	const [employersE, setEmployersE] = useState(null);
	const [stationType, setStationType] = useState(null);
	// const [workstation, setWorkstation] = useState(null);
	const [employPeriod, setEmployPeriod] = useState(null);
	const [nursePeriod, setNursePeriod] = useState(null);
	const [outCountry, setOutCountry] = useState(null);
	const [returnValue, setReturnValue] = useState(null);
	

	const [department, setDepartment] = useState('')
	const [currentPosition, setCurrentPosition] = useState('')


	const [dropMarital, setDropMarital] = useState(false);
	// const [countyDrop, setCountyDrop] = useState(false);
	const [reasonsDrop, setReasonsDrop] = useState(false);
	const [statusDrop, setStatusDrop] = useState(false);
	const [employDrop, setEmployDrop] = useState(false);
	const [stationDrop, setStationDrop] = useState(false);
	const [periodDrop, setPeriodDrop] = useState(false);
	const [nurseDrop, setNurseDrop] = useState(false);
	const [countryDrop, setCountryDrop] = useState(false);
	const [returnDrop, setReturnDrop] = useState(false);
	const [educDrop, setEducDrop] = useState(false);


	const textInputProps: TextInputProps = {
		theme: theme,
		style: styles.input,
		outlineColor: '#0345B53D',
		activeOutlineColor: '#0445b5',
	};

	const { height } = useWindowDimensions();

	const router = useRouter();
	const toast = useToast();

	const successFn = () => {
		router.replace('/');
	};

	const errorFn = () => {
		toast.show({
			onCloseComplete() {},
			duration: 5000,
			render: ({ id }) => {
				return (
					<ToastError
						id={id}
						title='Application Error'
						description='Could not complete exam application. Please retry later'
					/>
				);
			},
			placement: 'top',
		});
	};

	const { mutate, isPending } = useApplyOutMigration(successFn, errorFn);

	interface UserDocument {
		uri: string | null;
		name: string;
		type?: string;
	}
	
	const [document, setDocument] = useState<UserDocument>();

  const pickPDF = async (name: string) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf', // Specify the MIME type for PDF files
      });

      if (result.type === 'success' && result.uri) {
        const item: UserDocument = {
          uri: result.uri,
          name: result.name || name, // Use the picked file's name if available, otherwise use the provided name
          type: 'application/pdf', // MIME type for PDF files
        };

        // Set the picked PDF document
        setDocument(item);
      } else {
        console.log('Document picking cancelled or failed');
      }
    } catch (error) {
      console.error('Error picking PDF:', error);
    }
  };


	const [_, setSelectedCounty] = useAtom(countAtom)
	const [stationName, setStationName] = useAtom(workStationAtom)

	useEffect(() => {
		setSelectedCounty(county || '')

		const filtered = workstations.find(item => item.id === station)


		if (filtered) {
			setStationName(filtered.workstation)
		}

	}, [county, workstations])


	const onSubmit = () => {
		
		const verificationCadres = educVal ? educVal.join(', ') : '';
		const currentDate = new Date();
		const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}T${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}Z`;


		mutate({
				index_id: user?.id || '',
				country_id: outCountry || '',
				application_date: formattedDate,
				marital_status: maritalStatus || '',
				dependants: dependants,
				employment_status: statusE || '',
				current_employer: employersE || '',
				workstation_type: stationType || '',
				workstation_id: station,
				workstation_name: stationName,
				department: department,
				current_position: currentPosition,
				experience_years: nursePeriod || '',
				duration_current_employer: employPeriod || '',
				planning_return: returnValue || '',
				form_attached :document,
				outmigration_reason: outReasons || '',
				verification_cadres: verificationCadres,
		});
		
};

	return (
		<View
			style={{
				flex: 1,
			}}>
			<KeyboardAvoidingView behavior='height'>
				<ScrollView
					nestedScrollEnabled={true}
					style={{
						paddingBottom: 20,
					}}>
					<View
						className='p-2'
						style={{
							height: dropMarital ? height * 0.22 : height * 0.07,
						}}>
						<DropDownPicker
							items={maritalStatusData ? maritalStatusData : []}
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

					<View
						className='p-2'
						style={{
							height: reasonsDrop ? height * 0.3 : height * 0.07,
						}}>
						<DropDownPicker
							items={reasonToApplyData ? reasonToApplyData : []}
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
							{...textInputProps}
							value={dependants}
							onChangeText={setDependants}
						/>
					</View>

					<View
						className='p-2'
						style={{
							height: statusDrop ? height * 0.28 : height * 0.07,
						}}>
						<DropDownPicker
							items={employementstatusData ? employementstatusData : []}
							value={statusE}
							setValue={setStatusE}
							multiple={false}
							open={statusDrop}
							placeholder='Employment Status'
							placeholderStyle={{
								fontSize: 16,
								color: '#7b7e81',
							}}
							setOpen={setStatusDrop}
							style={[
								styles.input,
								{
									borderColor: statusDrop ? '#0445b5' : '#0345B53D',
								},
							]}
							listMode='SCROLLVIEW'
						/>
					</View>

					<View
						className='p-2'
						style={{
							height: employDrop ? height * 0.28 : height * 0.07,
						}}>
						<DropDownPicker
							items={employers || []}
							value={employersE}
							setValue={setEmployersE}
							multiple={false}
							open={employDrop}
							placeholder='Current Employer'
							placeholderStyle={{
								fontSize: 16,
								color: '#7b7e81',
							}}
							setOpen={setEmployDrop}
							style={[
								styles.input,
								{
									borderColor: statusDrop ? '#0445b5' : '#0345B53D',
								},
							]}
							listMode='SCROLLVIEW'
						/>
					</View>

					<View
						className='p-2'
						style={{
							height: stationDrop ? height * 0.22 : height * 0.07,
						}}>
						<DropDownPicker
							items={workStationTypeData || []}
							value={stationType}
							setValue={setStationType}
							multiple={false}
							open={stationDrop}
							placeholder='Work Station Type'
							searchable
							placeholderStyle={{
								fontSize: 16,
								color: '#7b7e81',
							}}
							setOpen={setStationDrop}
							style={[
								styles.input,
								{
									borderColor: dropMarital ? '#0445b5' : '#0345B53D',
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
								items={actual || []}
								value={county}
								setValue={setCounty}
								multiple={false}
								open={countryDrop}
								placeholder='Select County'
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

					
						{loadingStations ? <ActivityIndicator /> :
						<View className='p-2'>
						<DropDownPicker
						items={workstationData ? workstationData : []}
						value={station}
						setValue={setStation}
						multiple={false}
						open={dropMarital}
						placeholder='Work Station'
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
					</View>} 
					
					

					<View className='p-2'>
						<TextInput
							label={
								<Text
									style={{
										color: '#0000004F',
									}}>
									Department
								</Text>
							}
							mode='outlined'
							{...textInputProps}
							value={department}
							onChangeText={setDepartment}
						/>
					</View>

					<View className='p-2'>
						<TextInput
							label={
								<Text
									style={{
										color: '#0000004F',
									}}>
									Current Position
								</Text>
							}
							mode='outlined'
							{...textInputProps}
							value={currentPosition}
							onChangeText={setCurrentPosition}
						/>
					</View>

					<View
						className='p-2'
						style={{
							height: periodDrop ? height * 0.3 : height * 0.07,
						}}>
						<DropDownPicker
							items={employmentPeriodData ? employmentPeriodData : []}
							value={employPeriod}
							setValue={setEmployPeriod}
							multiple={false}
							open={periodDrop}
							placeholder='Period With Current Employer'
							placeholderStyle={{
								fontSize: 16,
								color: '#7b7e81',
							}}
							setOpen={setPeriodDrop}
							style={[
								styles.input,
								{
									borderColor: dropMarital ? '#0445b5' : '#0345B53D',
								},
							]}
							listMode='SCROLLVIEW'
						/>
					</View>

					<View
						className='p-2'
						style={{
							height: nurseDrop ? height * 0.3 : height * 0.07,
						}}>
						<DropDownPicker
							items={period || []}
							value={nursePeriod}
							setValue={setNursePeriod}
							multiple={false}
							open={nurseDrop}
							placeholder='Period Working As A Nurse'
							placeholderStyle={{
								fontSize: 16,
								color: '#7b7e81',
							}}
							setOpen={setNurseDrop}
							style={[
								styles.input,
								{
									borderColor: dropMarital ? '#0445b5' : '#0345B53D',
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
							items={countryData || []}
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
							items={planToReturnData ? planToReturnData : []}
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
									borderColor: dropMarital ? '#0445b5' : '#0345B53D',
								},
							]}
							listMode='SCROLLVIEW'
						/>
					</View>

					<View className='p-2'>
						<View>
							<Pressable onPress={() => pickPDF('verification_form')}>
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
									onPressIn={() => pickPDF('verification_form')}
									{...textInputProps}
								/>
							</Pressable>
						</View>
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
						<Button mode='contained' style={styles.button} onPress={onSubmit} loading={isPending}>
							Submit Application
						</Button>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
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
});

export default ApplyOutComponent;
