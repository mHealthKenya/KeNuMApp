import {Ionicons} from '@expo/vector-icons';
import {Image} from 'expo-image';
import {useRouter} from 'expo-router';
import {useAtom} from 'jotai';
import React, {FC, useEffect, useMemo, useState} from 'react';
import {KeyboardAvoidingView, Platform, Pressable, StyleSheet, View, useWindowDimensions} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {ActivityIndicator, Button} from 'react-native-paper';
import {diasporaAtom} from '../../atoms/diaporaatom';
import {primaryColor} from '../../constants/Colors';
import {Employer} from '../../models/employers';
import {useAuth} from '../../providers/auth';
import useLicenceApply from '../../services/licence/apply';
import {Text} from '../Themed';
import LicenceApplyBox, {Item} from './licencebox';
import {Loader2} from '@tamagui/lucide-icons';

const LicenceApplicationComponent: FC<{
	employers: Employer[];
	county: Item;
	workstation: Item;
}> = ({employers, county, workstation}) => {
	const {width, height} = useWindowDimensions();
	const actualWidth = Math.min(width, height);
	const usableWidth = actualWidth - 20;

	const [selected, setSelected] = useState(null);

	const [dropDown, setDropDown] = useState(false);

	const [diaspora, _] = useAtom(diasporaAtom);

	const items = useMemo(
		() =>
			employers?.map((item) => ({
				label: item.employer,
				value: item.id,
			})),
		[employers]
	);

	const router = useRouter();

	const successFn = () => {
		router.push('/licenceapplications');
	};

	const {mutate, isPending} = useLicenceApply(successFn);

	const {user} = useAuth();

	const handleSubmit = () => {
		mutate({
			index_id: user?.id || '',
			workstation_id: workstation.id,
			county_id: county.id,
			workstation_name: workstation.title,
			employer_id: !diaspora ? '' + selected : '1',
		});
	};

	const [checked, setChecked] = useState(false);

	const [disabled, setDisabled] = useState(false);

	useEffect(() => {
		setDisabled(() => (!selected && !diaspora) || !checked);
	}, [diaspora, checked, selected]);

	return (
		<View className='flex flex-1'>
			<View className='p-3'>
				<KeyboardAvoidingView behavior='position'>
					<View className='flex items-center justify-center h-[50%]'>
						<Image
							source={require('../../assets/images/licencelarge.png')}
							style={{
								height: height * 0.36,
								width: (usableWidth * 5) / 6,
							}}
						/>
					</View>
					<View className='flex w-full'>
						<LicenceApplyBox county={county} workstation={workstation} />
					</View>

					<View className='flex flex-col p-2 mb-2 gap-2'>
						{!diaspora && (
							<DropDownPicker
								items={items}
								value={selected}
								setValue={setSelected}
								multiple={false}
								open={dropDown}
								placeholder='Select an employer'
								placeholderStyle={{
									fontSize: 16,
									fontFamily: 'normal',
								}}
								textStyle={{
									fontFamily: 'normal',
								}}
								searchable
								setOpen={setDropDown}
							/>
						)}

						<View className='flex flex-row gap-2 items-center mt-4 mb-2'>
							<Pressable
								role='checkbox'
								aria-checked={checked}
								style={[styles.checkboxBase, checked && styles.checkboxChecked]}
								onPress={() => setChecked(!checked)}>
								{checked && <Ionicons name='checkmark' size={24} color='white' />}
							</Pressable>
							<Text>I confirm that I am fit to practice</Text>
						</View>

						<Pressable
							className='flex items-center justify-center py-4 rounded-md'
							style={{backgroundColor: disabled ? '#bbbbbb' : primaryColor}}
							disabled={disabled}>
							<View className='flex flex-row gap-2'>
								{isPending && <ActivityIndicator size='small' color='#FFFFFF' />}
								<Text className={`uppercase mt-1 ${disabled ? 'text-[#85878b]' : 'text-white'}`} onPress={handleSubmit}>
									Apply
								</Text>
							</View>
						</Pressable>
					</View>
				</KeyboardAvoidingView>
			</View>
		</View>
	);
};

export default LicenceApplicationComponent;

const styles = StyleSheet.create({
	center: {
		justifyContent: 'center',
		alignItems: 'center',
	},

	input: {
		backgroundColor: '#f9f9f9',
	},

	box: {
		padding: 10,
	},

	button: {
		borderRadius: 5,
		backgroundColor: primaryColor,
	},

	licence: {
		...Platform.select({
			ios: {
				zIndex: 1000,
			},
		}),
	},

	disabled: {
		backgroundColor: '#bbbbbb',
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
});
