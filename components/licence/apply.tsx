import {Image} from 'expo-image';
import {useRouter} from 'expo-router';
import React, {FC, useMemo, useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, View, useWindowDimensions} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {Button} from 'react-native-paper';
import {primaryColor} from '../../constants/Colors';
import {Employer} from '../../models/employers';
import {useAuth} from '../../providers/auth';
import useLicenceApply from '../../services/licence/apply';
import globalStyles from '../../styles/global';
import LicenceApplyBox, {Item} from './licencebox';
import {diasporaAtom} from '../../atoms/diaporaatom';
import {useAtom} from 'jotai';
import {LicenceApplication} from '../../models/licenceapplications';

const LicenceApplicationComponent: FC<{
	employers: Employer[];
	county: Item;
	workstation: Item;
	applications: LicenceApplication[];
}> = ({employers, county, workstation, applications}) => {
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

	const hasPendingApplications = applications?.some((a) => {
		return a.invoice_details.balance_due ? +a.invoice_details.balance_due > 0 : false;
	});

	const hasActiveLicence = user?.license?.some((l) => {
		return l.to_date ? new Date(l.to_date) > new Date() : false;
	});

	return (
		<View style={globalStyles.container}>
			<View className='p-3'>
				<KeyboardAvoidingView behavior='position'>
					<View
						style={[
							styles.center,
							{
								height: height * 0.4,
							},
						]}>
						<Image
							source={require('../../assets/images/licencelarge.png')}
							style={{
								height: height * 0.36,
								width: (usableWidth * 5) / 6,
							}}
						/>
					</View>
					<View
						style={{
							height: height * 0.2,
						}}>
						<LicenceApplyBox county={county} workstation={workstation} />
					</View>

					<View
						style={[
							styles.box,
							{
								height: height * 0.35,
								gap: 10,
							},
						]}>
						{!diaspora && (
							<DropDownPicker
								items={items || []}
								value={selected}
								setValue={setSelected}
								multiple={false}
								open={dropDown}
								placeholder='Select an employer'
								placeholderStyle={{
									fontSize: 16,
								}}
								searchable
								setOpen={setDropDown}
							/>
						)}

						<Button
							mode='contained'
							style={(!selected && !diaspora) || hasActiveLicence || hasPendingApplications ? styles.disabled : styles.button}
							loading={isPending}
							onPress={handleSubmit}
							disabled={(!selected && !diaspora) || hasPendingApplications || hasActiveLicence}>
							Apply
						</Button>
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
});
