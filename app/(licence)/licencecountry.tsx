import { StatusBar } from 'expo-status-bar';
import React from 'react';
import LicenceCountrySelect from '../../components/licence/country';

const LicenceCountry = () => {
	return (
		<>
			<LicenceCountrySelect />
			<StatusBar style='light' />
		</>
	);
};

export default LicenceCountry;
