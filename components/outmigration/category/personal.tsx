import React, { FC, useMemo, useState } from 'react';
import {
	KeyboardAvoidingView,
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
import DropDownPicker from 'react-native-dropdown-picker';
import { MaritalStatus } from '../../../models/maritalstatus';
import { User } from '../../../models/user';

const theme = {
	roundness: 12,
};

interface FormData {
  maritalStatus: string;
  dependants: string;
}

const OutMigrationPersonal: FC<{
	user: User;
	marital_status: MaritalStatus | undefined;
  onNext: () => void; onChange: (data: Partial<FormData>) => void 
}> = ({user, marital_status, onNext, onChange}) => {
	

  const [maritalStatus, setMaritalStatus] = useState('')
  const [dependants, setDependants] = useState('')
	const [dropMarital, setDropMarital] = useState(false);


	const maritalStatusData = useMemo(() => {
		return marital_status?.marital_status_types.map((items) => ({
			label: items.marital_status_type,
      value: items.id,
		}))
	}, [marital_status])

  const handleNext = () => {
    if (maritalStatus && dependants) {
      onChange({ maritalStatus, dependants }); // Pass data to parent component
      onNext(); // Move to next category
    } else {
      // Handle incomplete inputs
    }
  };


	const textInputProps: TextInputProps = {
		theme: theme,
		style: styles.input,
		outlineColor: '#0345B53D',
		activeOutlineColor: '#0445b5',
	};

	const { height } = useWindowDimensions();


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

            ``

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

export default OutMigrationPersonal;
