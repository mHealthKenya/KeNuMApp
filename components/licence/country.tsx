import {useAtom} from 'jotai';
import React from 'react';
import {ScrollView} from 'react-native';
import {diasporaAtom} from '../../atoms/diaporaatom';
import LBox from './lbox';

const LicenceCountrySelect = () => {
	const [_, setDiaspora] = useAtom(diasporaAtom);
	const action = () => {
		setDiaspora(true);
	};

	const actionF = () => {
		setDiaspora(false);
	};

	return (
		<ScrollView>
			<LBox
				box={{
					title: 'In country application',
					content: 'Renew your licence while you are in Kenya',
					backgroundColor: '#FFFFFF',
					path: require('../../assets/images/Flag.jpeg'),
					route: '/counties',
					action: actionF,
				}}
			/>

			<LBox
				box={{
					title: 'Out of country application',
					content: 'Apply for your licence renewal while abroad',
					backgroundColor: '#FFFFFF',
					path: require('../../assets/images/outmigration.png'),
					route: '/licenceapplication',
					action,
				}}
			/>
		</ScrollView>
	);
};

export default LicenceCountrySelect;
