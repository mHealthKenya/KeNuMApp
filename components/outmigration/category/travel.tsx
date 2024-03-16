import React, { FC, useEffect, useMemo, useState } from 'react';
import {
	KeyboardAvoidingView,
	Pressable,
	ScrollView,
	StyleSheet,
	View,
	useWindowDimensions,
} from 'react-native';
// import DropDownPicker from 'react-native-dropdown-picker';
import * as DocumentPicker from 'expo-document-picker';
import {
	ActivityIndicator,
	Button,
	Icon,
	Text,
	TextInput,
	TextInputProps,
} from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useToast } from '@gluestack-ui/themed';
import { useAtom } from 'jotai';
import DropDownPicker from 'react-native-dropdown-picker';
import { User } from '../../../models/user';
import { PlanToReturn } from '../../../models/plantoreturn';
import { OutMigrationReason } from '../../../models/outmigration_reason';
import { Country } from '../../../models/countries';
import ToastError from '../../shared/ToastError';
import { countAtom } from '../../../atoms/county';
import { truncateText } from '../../../helpers/truncate';

const theme = {
	roundness: 12,
};

const OutMigrationTravel: FC<{
  countries: Country[] ;
	user: User;
	planToReturn: PlanToReturn | undefined;
	reasonToApply: OutMigrationReason | undefined;
	loadingStations?: boolean;
  onNext: () => void; onChange: (data: Partial<FormData>) => void 
}> = ({countries, user, planToReturn, reasonToApply, onNext, onChange }) => {
	const [educVal, setEducVal] = useState<string[] | null>(null);



	const [outReasons, setOutReasons] = useState('');
	const [outCountry, setOutCountry] = useState(null);
	const [returnValue, setReturnValue] = useState(null);
	
  const [dropMarital, setDropMarital] = useState(false);


	const [reasonsDrop, setReasonsDrop] = useState(false);
	const [countryDrop, setCountryDrop] = useState(false);
	const [returnDrop, setReturnDrop] = useState(false);
	const [educDrop, setEducDrop] = useState(false);

	const education = useMemo(
		() =>
			user?.education?.map((item) => ({
				label: item?.cadre_text,
				value: item?.education_id
			})),
		[user]
	);

	
	const countryData = useMemo(() => {
		return countries.map((item) => ({
			label: item.country,
			value: item.id,
		}))
	}, [countries])



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


	const textInputProps: TextInputProps = {
		theme: theme,
		style: styles.input,
		outlineColor: '#0345B53D',
		activeOutlineColor: '#0445b5',
	};

	const { height } = useWindowDimensions();

	

	const [selectedFile, setSelectedFile] = useState<DocumentPicker.DocumentPickerResult | null>(null);

  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
      });
      setSelectedFile(res);
			// console.log('File content:', res.uri)
			console.log('Document: ', res)
    } catch (err) {
      if (err) {
        console.log('User cancelled the picker');
      } else {
        console.log('Error occurred while picking the document', err);
      }
    }
  };

  const handleNext = () => {
    if (outReasons && outCountry && returnValue && educVal && selectedFile) {
      onChange({ outReasons, outCountry, returnValue, educVal, selectedFile }); // Pass data to parent component
      onNext(); // Move to next category
    } else {
      // Handle incomplete inputs
    }
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

export default OutMigrationTravel;
