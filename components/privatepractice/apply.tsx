import {
	View,
	Text,
	StyleSheet,
	useWindowDimensions,
	KeyboardAvoidingView,
	ScrollView,
	ActivityIndicator,
	Platform,
	Pressable,
} from 'react-native';
import React, {FC, useEffect, useMemo, useState} from 'react';
import {Button, TextInput, TextInputProps} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import {County} from '../../models/counties';
import {Image} from 'expo-image';
import {ProposedPractice} from '../../models/proposedprcactice';
import {PracticeMode} from '../../models/practicemode';
import {WorkStation} from '../../models/workstations';
import {useAtom} from 'jotai';
import {countAtom} from '../../atoms/county';
import usePrivatePracticeApply from '../../services/privatepractice/apply';
import {User} from '../../models/user';
import {workStationAtom} from '../../atoms/workstation';
import {Ionicons} from '@expo/vector-icons';

const theme = {
	roundness: 12,
};

const ApplyPrivateComponent: FC<{
	counties: County[];
	proposed?: ProposedPractice;
	modes?: PracticeMode;
	stations: WorkStation[];
	loadingStations?: boolean;
	user: User;
}> = ({counties, proposed, modes, stations, loadingStations, user}) => {
	const actual = useMemo(
		() =>
			counties.map((item) => ({
				label: item.County,
				value: item.id,
			})),
		[counties]
	);

	const workStations = useMemo(
		() =>
			stations.map((item) => ({
				label: item.workstation,
				value: item.id,
			})),
		[stations]
	);

	const proposedPractice = useMemo(
		() =>
			proposed?.proposed_practice_types?.map((item) => ({
				label: item.proposed_practice_type,
				value: item.id,
			})),
		[proposed]
	);

	const practicalMode = useMemo(
		() =>
			modes?.practice_modes?.map((item) => ({
				label: item.practice_mode,
				value: item.id,
			})),
		[modes]
	);

	const [county, setCounty] = useState(null);
	const [practiceProposed, setPracticeProposed] = useState(null);
	const [practiceMode, setPracticeMode] = useState(null);
	const [station, setStation] = useState(null);
	const [dropDown, setDropDown] = useState(false);
	const [dropDownP, setDropDownP] = useState(false);
	const [countyDrop, setCountyDrop] = useState(false);
	const [stationDrop, setStationDrop] = useState(false);
	const [town, setTown] = useState('');
	const textInputProps: TextInputProps = {
		theme: theme,
		style: styles.input,
		outlineColor: '#0345B53D',
		activeOutlineColor: '#0445b5',
	};

	const [_, setSelectedCounty] = useAtom(countAtom);
	const [stationName, setStationName] = useAtom(workStationAtom);

	const handleTown = (text: string) => {
		setTown(text);
	};

	useEffect(() => {
		setSelectedCounty(county || '');

		const filtered = stations.find((item) => item.id === station);

		if (filtered) {
			setStationName(filtered.workstation);
		}
	}, [county, station]);

	const {mutate, isPending} = usePrivatePracticeApply();

	const handleSubmit = () => {
		mutate({
			index_id: user?.id || '',
			proposed_practice_id: practiceProposed || '',
			practice_mode_id: practiceMode || '',
			county_id: county || '',
			town,
			workstation_id: station || '',
			workstation_name: stationName,
		});
	};

	const {height, width} = useWindowDimensions();

	const [checked, setChecked] = useState(false);

	return (
		<View
			style={{
				flex: 1,
			}}>
			<KeyboardAvoidingView behavior='position' style={{flex: 1}}>
				<ScrollView
					nestedScrollEnabled={true}
					style={{
						paddingBottom: 20,
					}}>
					<View
						style={{
							height: height * 0.2,
							width: width * 0.98,
						}}
						className='justify-center items-center'>
						<Image
							source={require('../../assets/images/private.png')}
							style={{
								width: width * 0.3,
								height: height * 0.15,
							}}
						/>
					</View>

					<View className='p-2' style={styles.county}>
						<DropDownPicker
							items={actual || []}
							value={county}
							setValue={setCounty}
							multiple={false}
							zIndex={4000}
							open={countyDrop}
							placeholder='Select County'
							searchable
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
									borderColor: countyDrop ? '#0445b5' : '#0345B53D',
								},
							]}
							listMode='SCROLLVIEW'
						/>
					</View>

					{loadingStations ? (
						<ActivityIndicator />
					) : (
						<View className='p-2' style={styles.station}>
							<DropDownPicker
								items={workStations || []}
								value={station}
								setValue={setStation}
								multiple={false}
								open={stationDrop}
								placeholder='Select Workstation'
								searchable
								zIndex={3000}
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
								disabled={!county || loadingStations}
								listMode='SCROLLVIEW'
								dropDownDirection='BOTTOM'
							/>
						</View>
					)}
					<View className='p-2' style={styles.proposed}>
						<DropDownPicker
							items={proposedPractice || []}
							zIndex={2000}
							value={practiceProposed}
							setValue={setPracticeProposed}
							multiple={false}
							open={dropDown}
							placeholder='Proposed Practice'
							placeholderStyle={{
								fontSize: 16,
								fontFamily: 'normal',
							}}
							textStyle={{
								fontFamily: 'normal',
							}}
							setOpen={setDropDown}
							style={[
								styles.input,
								{
									borderColor: dropDown ? '#0445b5' : '#0345B53D',
								},
							]}
							listMode='SCROLLVIEW'
						/>
					</View>
					<View className='p-2' style={styles.mode}>
						<DropDownPicker
							items={practicalMode || []}
							value={practiceMode}
							setValue={setPracticeMode}
							multiple={false}
							open={dropDownP}
							placeholder='Practice Mode'
							placeholderStyle={{
								fontSize: 16,
								fontFamily: 'normal',
							}}
							textStyle={{
								fontFamily: 'normal',
							}}
							zIndex={1000}
							setOpen={setDropDownP}
							style={[
								styles.input,
								{
									borderColor: dropDownP ? '#0445b5' : '#0345B53D',
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
									Town / Market
								</Text>
							}
							onChangeText={handleTown}
							mode='outlined'
							{...textInputProps}
						/>
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
						<Button
							mode='contained'
							style={[styles.button, (isPending || !checked) && styles.buttonDisabled]}
							onPress={handleSubmit}
							loading={isPending}
							disabled={isPending || !checked}>
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

	buttonDisabled: {
		backgroundColor: '#A9A9A9', // Disabled button color
	},

	proposed: {
		...Platform.select({
			ios: {
				zIndex: 2000,
			},
		}),
	},

	mode: {
		...Platform.select({
			ios: {
				zIndex: 1000,
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
});

export default ApplyPrivateComponent;
