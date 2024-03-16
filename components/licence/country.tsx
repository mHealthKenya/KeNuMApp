import React from 'react';
import {View} from 'react-native';
import globalStyles from '../../styles/global';
import LBox from './lbox';
import {useAtom} from 'jotai';
import {diasporaAtom} from '../../atoms/diaporaatom';

const LicenceCountrySelect = () => {
	const [_, setDiaspora] = useAtom(diasporaAtom);
	const action = () => {
		setDiaspora(true);
	};

	const actionF = () => {
		setDiaspora(false);
	};

	return (
		<View style={globalStyles.container}>
			<LBox
				box={{
					title: 'In country application',
					content: 'Renew your licence while you are in Kenya',
					backgroundColor: '#dcf0fa',
					path: require('../../assets/images/Flag.jpeg'),
					route: '/counties',
					action: actionF,
				}}
			/>

			<LBox
				box={{
					title: 'Out of country application',
					content: 'Apply for your licence renewal while abroad',
					backgroundColor: '#dcf0fa',
					path: require('../../assets/images/outmigration.png'),
					route: '/licenceapplication',
					action,
				}}
			/>
		</View>
	);
};

export default LicenceCountrySelect;
