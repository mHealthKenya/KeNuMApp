import {Ionicons} from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import React, {FC, useMemo, useState} from 'react';
import {KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, View, useWindowDimensions} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {Button, Icon, Text, TextInput, TextInputProps} from 'react-native-paper';
import {DropDownItem} from '../../app/(outmigration)/applyoutmigration';
import {employers, marital, period, reasons, returning, status, workstationType} from '../../data/outmigration';
import {truncateText} from '../../helpers/truncate';
import {User} from '../../models/user';

const theme = {
	roundness: 12,
};

const ApplyOutComponent: FC<{
	countries: DropDownItem[];
	user: User;
}> = ({countries, user}) => {
	const education = useMemo(
		() =>
			user?.education?.map((item) => ({
				label: item?.cadre_text,
				value: item?.cadre_text,
			})),
		[user]
	);

	// const [county, setCounty] = useState(null);
	const [selectedFile, setSelectedFile] = useState<DocumentPicker.DocumentPickerResult>();
	const [maritalStatus, setMaritalStatus] = useState(null);
	const [outReasons, setOutReasons] = useState(null);
	const [statusE, setStatusE] = useState(null);
	const [employersE, setEmployersE] = useState(null);
	const [stationType, setStationType] = useState(null);
	const [employPeriod, setEmployPeriod] = useState(null);
	const [nursePeriod, setNursePeriod] = useState(null);
	const [outCountry, setOutCountry] = useState(null);
	const [returnValue, setReturnValue] = useState(null);
	const [educVal, setEducVal] = useState<string[] | null>(null);
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

	const pickDocument = async () => {
		let result = await DocumentPicker.getDocumentAsync();
		setSelectedFile(result);
	};

	const textInputProps: TextInputProps = {
		theme: theme,
		style: styles.input,
		outlineColor: '#0345B53D',
		activeOutlineColor: '#0445b5',
	};

	const {height} = useWindowDimensions();

	const [checked, setChecked] = useState(false);

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

					<View
						className='p-2'
						style={{
							height: reasonsDrop ? height * 0.3 : height * 0.07,
						}}>
						<DropDownPicker
							items={reasons || []}
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
						/>
					</View>

					<View
						className='p-2'
						style={{
							height: statusDrop ? height * 0.28 : height * 0.07,
						}}>
						<DropDownPicker
							items={status || []}
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
							items={workstationType || []}
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

					<View className='p-2'>
						<TextInput
							label={
								<Text
									style={{
										color: '#0000004F',
									}}>
									Work Station
								</Text>
							}
							mode='outlined'
							{...textInputProps}
						/>
					</View>

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
						/>
					</View>

					<View
						className='p-2'
						style={{
							height: periodDrop ? height * 0.3 : height * 0.07,
						}}>
						<DropDownPicker
							items={period || []}
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
							items={countries || []}
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
							items={returning || []}
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
							<View className='flex flex-row space-x-3'>
								<View className='justify-center'>
									<Icon source='check-circle' size={25} color='green' />
								</View>

								<View className='justify-center'>
									<Text className='tracking-widest p-2'>{item}</Text>
								</View>
							</View>
						))}
					</View>

					<View className='flex flex-row gap-2 items-center p-2'>
						<Pressable
							role='checkbox'
							aria-checked={checked}
							style={[styles.checkboxBase, checked && styles.checkboxChecked]}
							onPress={() => setChecked(!checked)}>
							{checked && <Ionicons name='checkmark' size={24} color='white' />}
						</Pressable>
						<Text>I confirm that I am fit to practice</Text>
					</View>

					<View className='p-2'>
						<Button mode='contained' style={[styles.button, !checked && styles.buttonDisabled]}>
							Submit Applications
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

export default ApplyOutComponent;
