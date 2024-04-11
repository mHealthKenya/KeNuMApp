import React from 'react';
import {View} from 'react-native';
import globalStyles from '../../styles/global';
import CPDBoxComponent from '../cpds/cpdbox';
import {ScrollView} from 'react-native';

const ProfessionalComponent = () => {
	return (
		<View style={globalStyles.container}>
			<ScrollView
				style={{
					flex: 1,
				}}>
				<CPDBoxComponent
					box={{
						title: 'CPDs',
						content: 'Self report CPDs, claim points and view self reporting history',
						backgroundColor: '#dcf0fa',
						path: require('../../assets/images/cpdbooksmall.png'),
						route: '/cpdhome',
					}}
				/>
				<CPDBoxComponent
					box={{
						title: 'Licence Renewal',
						content: 'Apply for licences, view applications history, pay for licence, and download licences.',
						backgroundColor: '#dcf0fa',
						path: require('../../assets/images/licencelarge.png'),
						route: '/licencehome',
					}}
				/>

				<CPDBoxComponent
					box={{
						title: 'Private Practice',
						content: 'Apply for private practice, view applications history, and pay for private practice licence.',
						backgroundColor: '#dcf0fa',
						path: require('../../assets/images/private.png'),
						route: '/privatepracticelanding',
					}}
				/>

				<CPDBoxComponent
					box={{
						title: 'Out Migration',
						content: 'Apply for migration, view applications history, pay for outmigration.',
						backgroundColor: '#dcf0fa',
						path: require('../../assets/images/outmigration.png'),
						route: '/outmigrationhome',
					}}
				/>
			</ScrollView>
		</View>
	);
};

export default ProfessionalComponent;
