import {
	View,
	Text,
	StyleSheet,
	useWindowDimensions,
	KeyboardAvoidingView,
	ScrollView,
} from 'react-native';
import React, { FC, useMemo, useState } from 'react';
import { Button, TextInput, TextInputProps } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { County } from '../../models/counties';
import { Image } from 'expo-image';

const theme = {
	roundness: 12,
};

const proposed = [
	{
		label: 'Own Behalf/Self',
		value: 'Own Behalf/Self',
	},

	{
		label: 'Employed',
		value: 'Employed',
	},
];

const mode = [
	{
		label: 'Full Time',
		value: 'Full Time',
	},

	{
		label: 'Part Time',
		value: 'Part Time',
	},
];

const ApplyPrivateComponent: FC<{ counties: County[] }> = ({ counties }) => {
	const actual = useMemo(
		() =>
			counties.map((item) => ({
				label: item.County,
				value: item.id,
			})),
		[counties]
	);
	const [county, setCounty] = useState(null);
	const [practiceProposed, setPracticeProposed] = useState(null);
	const [practiceMode, setPracticeMode] = useState(null);
	const [dropDown, setDropDown] = useState(false);
	const [dropDownP, setDropDownP] = useState(false);
	const [countyDrop, setCountyDrop] = useState(false);
	const textInputProps: TextInputProps = {
		theme: theme,
		style: styles.input,
		outlineColor: '#0345B53D',
		activeOutlineColor: '#0445b5',
	};

	const { height, width } = useWindowDimensions();
	return (
		<View
			style={{
				flex: 1,
			}}>
			<KeyboardAvoidingView behavior='position' style={{ flex: 1 }}>
				<ScrollView
					nestedScrollEnabled={true}
					style={{
						paddingBottom: 20,
					}}>
					<View
						style={{
							height: height * 0.3,
							width: width * 0.98,
						}}
						className='justify-center items-center'>
						<Image
							source={require('../../assets/images/private.png')}
							style={{
								width: width * 0.4,
								height: height * 0.25,
							}}
						/>
					</View>
					<View
						className='p-2'
						style={{
							height: dropDown ? height * 0.2 : height * 0.07,
						}}>
						<DropDownPicker
							items={proposed || []}
							value={practiceProposed}
							setValue={setPracticeProposed}
							multiple={false}
							open={dropDown}
							placeholder='Proposed Practice'
							placeholderStyle={{
								fontSize: 16,
								color: '#7b7e81',
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
					<View
						className='p-2'
						style={{
							height: dropDownP ? height * 0.2 : height * 0.07,
						}}>
						<DropDownPicker
							items={mode || []}
							value={practiceMode}
							setValue={setPracticeMode}
							multiple={false}
							open={dropDownP}
							placeholder='Practice Mode'
							placeholderStyle={{
								fontSize: 16,
								color: '#7b7e81',
							}}
							setOpen={setDropDownP}
							style={[
								styles.input,
								{
									borderColor: dropDown ? '#0445b5' : '#0345B53D',
								},
							]}
							listMode='SCROLLVIEW'
						/>
					</View>
					<View
						className='p-2'
						style={{
							height: countyDrop ? height * 0.3 : height * 0.07,
						}}>
						<DropDownPicker
							items={actual || []}
							value={county}
							setValue={setCounty}
							multiple={false}
							open={countyDrop}
							placeholder='Select County'
							searchable
							placeholderStyle={{
								fontSize: 16,
								color: '#7b7e81',
							}}
							setOpen={setCountyDrop}
							style={[
								styles.input,
								{
									borderColor: dropDown ? '#0445b5' : '#0345B53D',
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
									Workstation / Facility
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
									Town / Market
								</Text>
							}
							mode='outlined'
							{...textInputProps}
						/>
					</View>
					<View className='p-2'>
						<Button mode='contained' style={styles.button}>
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

export default ApplyPrivateComponent;
