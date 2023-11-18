import React from 'react';
import { StyleSheet, View } from 'react-native';
import globalStyles from '../../styles/global';
import ApplyBox from './box/apply';
import CheckInBox from './box/checkin';
import HistoryBox from './box/history';
import RotationsBox from './box/rotations';
import TransfersBox from './box/transfers';

const InternshipComponent = () => {
	return (
		<View style={[globalStyles.container]}>
			<View style={[{ flex: 1 }]}>
				<ApplyBox />
				<CheckInBox />
				<RotationsBox />
				<TransfersBox />
				<HistoryBox />
			</View>
		</View>
	);
};

export default InternshipComponent;

const styles = StyleSheet.create({
	box: {
		margin: 10,
		padding: 20,
		borderRadius: 10,
	},
});
