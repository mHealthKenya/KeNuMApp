import React, { FC, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
	KeyboardAvoidingView,
	ScrollView,
	StyleSheet,
	View,
	useWindowDimensions,
} from 'react-native';
import {
	Button,
	Text,
	TextInput,
	TextInputProps,
} from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useToast } from '@gluestack-ui/themed';
import { useAtom } from 'jotai';
import DropDownPicker from 'react-native-dropdown-picker';
import { EmploymentPeriod } from '../../../models/employmentperiod';
import { WorkStation } from '../../../models/workstations';
import { County } from '../../../models/counties';
import { WorkStationTypes } from '../../../models/workStationTypes';
import { Country } from '../../../models/countries';
import { EmploymentStatus } from '../../../models/employmentstatus';
import ToastError from '../../shared/ToastError';
import { countAtom } from '../../../atoms/county';
import { User } from '../../../models/user';
import { workStationAtom } from '../../../atoms/workstation';
import { Employer } from '../../../models/employers';
import { period } from '../../../data/outmigration';

const theme = {
	roundness: 12,
};

const OutMigrationEmployment: FC<{
	counties: County[];
	countries: Country[];
	workstationType: WorkStationTypes | undefined;
	user: User;
	employmentStatus: EmploymentStatus | undefined;
	employmentPeriod: EmploymentPeriod | undefined;
	workstations: WorkStation[];
	loadingStations?: boolean;
	employers: Employer[];
  onNext: () => void; onChange: (data: Partial<FormData>) => void
}> = ({ counties, user, employmentStatus, employmentPeriod, workstations, loadingStations, workstationType, employers, onNext, onChange }) => {


	const [station, setStation] = useState('')
	const [county, setCounty] = useState(null);
	
	const [statusE, setStatusE] = useState(null);
	
	const [employersE, setEmployersE] = useState(null);
	const [stationType, setStationType] = useState(null);
	const [employPeriod, setEmployPeriod] = useState(null);
	const [nursePeriod, setNursePeriod] = useState(null);
	

	const [department, setDepartment] = useState('')
	const [currentPosition, setCurrentPosition] = useState('')


	const [dropMarital, setDropMarital] = useState(false);
	const [statusDrop, setStatusDrop] = useState(false);
	const [employDrop, setEmployDrop] = useState(false);
	const [stationDrop, setStationDrop] = useState(false);
	const [periodDrop, setPeriodDrop] = useState(false);
	const [nurseDrop, setNurseDrop] = useState(false);
	const [countryDrop, setCountryDrop] = useState(false);

	const actual = useMemo(
		() =>
			counties.map((item) => ({
				label: item.County,
				value: item.id,
			})),
		[counties]
	);

  const handleNext = () => {
    if (station && county && statusE && employersE && stationType && county && department && currentPosition && employPeriod && nursePeriod ) {
      onChange({ station, county,  statusE, employersE, stationType,  department, currentPosition, employPeriod, nursePeriod}); // Pass data to parent component
      onNext(); // Move to next category
    } else {
      // Handle incomplete inputs
    }
  };


	
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


	const workstationData = useMemo(() => {
		return workstations?.map((item) => ({
			label: item.workstation,
      value: item.id,
		}))
	}, [workstations])

	const employerData = useMemo(() => {
		return employers?.map((item) => ({
      label: item.employer,
      value: item.id,
    }))
	}, [employers])


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

	const [_, setSelectedCounty] = useAtom(countAtom)
	const [stationName, setStationName] = useAtom(workStationAtom)

	useEffect(() => {
		setSelectedCounty(county || '')

		const filtered = workstations.find(item => item.id === station)


		if (filtered) {
			setStationName(filtered.workstation)
		}

	}, [county, workstations])


	

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
							items={employerData || []}
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

``

					<View className='p-2'>
						<Button mode='contained' style={styles.button} onPress={handleNext} >
							Next
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

export default OutMigrationEmployment;
