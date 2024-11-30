import {useRouter} from 'expo-router';
import {useAtom} from 'jotai';
import React, {FC, useEffect, useMemo, useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {Button, Text, TextInput, TextInputProps} from 'react-native-paper';
import {DropDownItem} from '../../../app/(outmigration)/applyoutmigration';
import {employmentAtom} from '../../../atoms/employment';
import useCounties from '../../../services/general/counties';
import useWorkStations from '../../../services/general/workstations';
import useEmployers from '../../../services/licence/employers';
import useEmploymentPeriods from '../../../services/outmigration/employmentperiods';
import useEmploymentStatus from '../../../services/outmigration/employmentstatus';
import useWorkStationTypes from '../../../services/outmigration/workstations';
import ProgressTrack from '../../shared/Progress';

const theme = {
	roundness: 12,
};

const EmploymentDetailsComponent: FC<{}> = () => {
	const [statusE, setStatusE] = useState<string | null>(null);
	const [employersE, setEmployersE] = useState<string | null>(null);
	const [stationType, setStationType] = useState<string | null>(null);
	const [county, setCounty] = useState<string | null>(null);
	const [station, setStation] = useState<string | null>(null);
	const [employPeriod, setEmployPeriod] = useState<string | null>(null);
	const [nursePeriod, setNursePeriod] = useState<string | null>(null);
	const [statusDrop, setStatusDrop] = useState(false);
	const [countyDrop, setCountyDrop] = useState(false);
	const [employDrop, setEmployDrop] = useState(false);
	const [stationDrop, setStationDrop] = useState(false);
	const [countyStationDrop, setCountyStationDrop] = useState(false);
	const [periodDrop, setPeriodDrop] = useState(false);
	const [nurseDrop, setNurseDrop] = useState(false);
	const [department, setDepartment] = useState<string>('');
	const [workstationName, setWorkstationName] = useState('');
	const [current_position, setCurrent_position] = useState('');

	const [disabled, setDisabled] = useState(true);

	const textInputProps: TextInputProps = {
		theme: theme,
		style: styles.input,
		outlineColor: '#0345B53D',
		activeOutlineColor: '#0445b5',
	};

	const {data: status, isLoading: loadingStatus} = useEmploymentStatus();
	const {data: employers = [], isLoading: loadingEmployers} = useEmployers();
	const {data: workStationTypes, isLoading: loadingWorkStationTypes} = useWorkStationTypes();
	const {data: counties, isLoading: loadingCounties} = useCounties();
	const {data: workStations, isLoading: loadingWorkStations} = useWorkStations(county || '');
	const {data: periods, isLoading: loadingPeriods} = useEmploymentPeriods();

	const employmentStatus: DropDownItem[] | undefined = useMemo(
		() =>
			status?.employment_status?.map((item) => ({
				label: item.status,
				value: item.id,
			})),
		[status]
	);

	const allEmployers = useMemo(
		() =>
			employers?.map((item) => ({
				label: item.employer,
				value: item.id,
			})),
		[employers]
	);

	const stationTypes = useMemo(
		() =>
			workStationTypes?.workstation_types?.map((item) => ({
				label: item.type,
				value: item.id,
			})),
		[workStationTypes]
	);

	const allCounties = useMemo(
		() =>
			counties?.map((item) => ({
				label: item.County,
				value: item.id,
			})),
		[counties]
	);

	const countyWorkStations = useMemo(
		() =>
			workStations?.map((item) => ({
				label: item.workstation,
				value: item.id,
			})),
		[workStations]
	);

	const allPeriods = useMemo(
		() =>
			periods?.employment_periods?.map((item) => ({
				label: item.period,
				value: item.id,
			})),
		[periods]
	);

	const handleDept = (department: string) => {
		setDepartment(department);
	};

	const handlePosition = (position: string) => {
		setCurrent_position(position);
	};

	const [employStatus, setEmployStatus] = useAtom(employmentAtom);

	useEffect(() => {
		setStatusE(employStatus?.employment_status || null);
		setEmployersE(employStatus?.current_employer || null);
		setStationType(employStatus?.workstation_type || null);
		setCounty(employStatus?.county || null);
		setStation(employStatus?.workstation_id || null);
		setDepartment(employStatus?.department || '');
		setCurrent_position(employStatus?.current_position || '');
		setEmployPeriod(employStatus?.duration_current_employer || null);
		setNursePeriod(employStatus?.experience_years || null);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [employmentStatus]);

	useEffect(() => {
		setDisabled(
			!(
				statusE &&
				employersE &&
				stationType &&
				county &&
				station &&
				department &&
				current_position &&
				employPeriod &&
				nursePeriod
			)
		);
	}, [statusE, employersE, stationType, county, station, department, current_position, employPeriod, nursePeriod]);

	useEffect(() => {
		const workStationName = countyWorkStations?.find((item) => item.value === station);
		setWorkstationName(workStationName?.label || '');
	}, [station]);

	const router = useRouter();

	const handleNext = () => {
		setEmployStatus({
			...employStatus,
			employment_status: statusE!,
			current_employer: employersE!,
			workstation_type: stationType!,
			county: county!,
			workstation_id: station!,
			department: department!,
			workstation_name: workstationName,
			current_position,
			duration_current_employer: employPeriod!,
			experience_years: nursePeriod!,
		});

		router.push('/personaldetails');
	};

	// if (loadingStatus || loadingCounties || loadingEmployers || loadingPeriods || loadingWorkStationTypes) {
	// 	return (
	// 		<View className='flex flex-1 justify-center items-center'>
	// 			<ActivityIndicator />
	// 		</View>
	// 	);
	// }

	return (
		<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className='flex flex-1'>
			<ScrollView
				nestedScrollEnabled={true}
				style={{
					paddingBottom: 160,
				}}
				className='p-3'>
				<View className='p-2 items-center'>
					<Text>Step 2 of 3</Text>
				</View>
				<View className='p-2 mb-4 items-center'>
					<ProgressTrack progress={2 / 3} />
				</View>

				<View className='p-2' style={styles.employment}>
					<DropDownPicker
						items={employmentStatus || []}
						value={statusE}
						setValue={setStatusE}
						multiple={false}
						open={statusDrop}
						zIndex={7000}
						placeholder='Employment Status'
						placeholderStyle={{
							fontSize: 16,
							fontFamily: 'normal',
						}}
						textStyle={{
							fontFamily: 'normal',
						}}
						setOpen={setStatusDrop}
						style={[
							styles.input,
							{
								borderColor: statusDrop ? '#0445b5' : '#0345B53D',
							},
						]}
						loading={loadingStatus}
						listMode='SCROLLVIEW'
					/>
				</View>

				<View className='p-2' style={styles.employer}>
					<DropDownPicker
						items={allEmployers || []}
						value={employersE}
						setValue={setEmployersE}
						multiple={false}
						zIndex={6000}
						open={employDrop}
						placeholder='Current Employer'
						placeholderStyle={{
							fontSize: 16,
							fontFamily: 'normal',
						}}
						textStyle={{
							fontFamily: 'normal',
						}}
						setOpen={setEmployDrop}
						style={[
							styles.input,
							{
								borderColor: statusDrop ? '#0445b5' : '#0345B53D',
							},
						]}
						listMode='SCROLLVIEW'
						loading={loadingEmployers}
					/>
				</View>

				<View className='p-2' style={styles.type}>
					<DropDownPicker
						items={stationTypes || []}
						value={stationType}
						setValue={setStationType}
						multiple={false}
						open={stationDrop}
						zIndex={5000}
						placeholder='Work Station Type'
						placeholderStyle={{
							fontSize: 16,
							fontFamily: 'normal',
						}}
						textStyle={{
							fontFamily: 'normal',
						}}
						setOpen={setStationDrop}
						style={[
							styles.input,
							{
								borderColor: stationDrop ? '#0445b5' : '#0345B53D',
							},
						]}
						listMode='SCROLLVIEW'
						loading={loadingWorkStationTypes}
					/>
				</View>

				<View className='p-2' style={styles.county}>
					<DropDownPicker
						items={allCounties || []}
						value={county}
						searchable
						setValue={setCounty}
						zIndex={4000}
						multiple={false}
						open={countyDrop}
						placeholder='Select County'
						placeholderStyle={{
							fontSize: 16,
							fontFamily: 'normal',
						}}
						textStyle={{
							fontFamily: 'normal',
						}}
						setOpen={setCountyDrop}
						style={[
							styles.input,
							{
								borderColor: stationDrop ? '#0445b5' : '#0345B53D',
							},
						]}
						listMode='SCROLLVIEW'
						loading={loadingCounties}
					/>
				</View>

				{/* {loadingWorkStations ? <ActivityIndicator /> : null} */}

				<View className='p-2' style={styles.station}>
					<DropDownPicker
						items={countyWorkStations || []}
						value={station}
						searchable
						zIndex={3000}
						setValue={setStation}
						multiple={false}
						open={countyStationDrop}
						placeholder='Select Work Station'
						placeholderStyle={{
							fontSize: 16,
							fontFamily: 'normal',
						}}
						textStyle={{
							fontFamily: 'normal',
						}}
						setOpen={setCountyStationDrop}
						style={[
							styles.input,
							{
								borderColor: stationDrop ? '#0445b5' : '#0345B53D',
							},
						]}
						listMode='SCROLLVIEW'
						loading={loadingWorkStations}
					/>
				</View>

				<View className='p-2' style={styles.periodE}>
					<DropDownPicker
						items={allPeriods || []}
						value={employPeriod}
						setValue={setEmployPeriod}
						multiple={false}
						open={periodDrop}
						zIndex={2000}
						placeholder='Period With Current Employer'
						placeholderStyle={{
							fontSize: 16,
							fontFamily: 'normal',
						}}
						textStyle={{
							fontFamily: 'normal',
						}}
						setOpen={setPeriodDrop}
						style={[
							styles.input,
							{
								borderColor: periodDrop ? '#0445b5' : '#0345B53D',
							},
						]}
						listMode='SCROLLVIEW'
						loading={loadingPeriods}
					/>
				</View>

				<View className='p-2' style={styles.periodN}>
					<DropDownPicker
						items={allPeriods || []}
						value={nursePeriod}
						setValue={setNursePeriod}
						multiple={false}
						open={nurseDrop}
						zIndex={1000}
						placeholder='Period Working As A Nurse'
						placeholderStyle={{
							fontSize: 16,
							fontFamily: 'normal',
						}}
						textStyle={{
							fontFamily: 'normal',
						}}
						setOpen={setNurseDrop}
						style={[
							styles.input,
							{
								borderColor: nurseDrop ? '#0445b5' : '#0345B53D',
							},
						]}
						listMode='SCROLLVIEW'
						loading={loadingPeriods}
					/>
				</View>

				<View className='p-2'>
					<TextInput
						label={<Text>Department</Text>}
						mode='outlined'
						defaultValue={employStatus?.department || ''}
						onChangeText={handleDept}
						{...textInputProps}
					/>
				</View>

				<View className='p-2'>
					<TextInput
						label={<Text>Current Position</Text>}
						defaultValue={employStatus?.current_position || ''}
						mode='outlined'
						onChangeText={handlePosition}
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
			</ScrollView>
		</KeyboardAvoidingView>
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

	employment: {
		...Platform.select({
			ios: {
				zIndex: 7000,
			},
		}),
	},

	employer: {
		...Platform.select({
			ios: {
				zIndex: 6000,
			},
		}),
	},

	type: {
		...Platform.select({
			ios: {
				zIndex: 5000,
			},
		}),
	},

	county: {
		...Platform.select({
			ios: {
				zIndex: 4000,
			},
		}),
	},

	station: {
		...Platform.select({
			ios: {
				zIndex: 3000,
			},
		}),
	},

	periodE: {
		...Platform.select({
			ios: {
				zIndex: 2000,
			},
		}),
	},

	periodN: {
		...Platform.select({
			ios: {
				zIndex: 1000,
			},
		}),
	},
});
export default EmploymentDetailsComponent;
