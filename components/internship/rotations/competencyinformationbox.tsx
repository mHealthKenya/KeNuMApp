import React, { FC } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Divider, Icon } from 'react-native-paper';
import { RotationCompetency } from '../../../models/rotationcompetencies';
import globalStyles from '../../../styles/global';

const CompetencyInformationBox: FC<{
	competency?: RotationCompetency | null;
}> = ({ competency }) => {
	const { width, height } = useWindowDimensions();
	const actualWidth = Math.min(width, height);
	const usableWidth = actualWidth - 20;

	return (
		<View
			style={[
				styles.box,
				{
					width: usableWidth,
					height: height * 0.17,
					backgroundColor: '#dcf0fa',
				},
			]}>
			<View style={[{ justifyContent: 'space-between', alignItems: 'center' }]}>
				<View
					style={[
						globalStyles.column,
						{
							justifyContent: 'space-between',
						},
					]}>
					<View
						style={{
							paddingHorizontal: 10,
						}}>
						<Text style={styles.titleText}>{competency?.competency}</Text>
						<Divider
							style={{
								marginTop: 5,
							}}
						/>
					</View>
					<View
						style={{
							padding: 10,
						}}>
						<Text style={styles.contentText}>
							Minimum Requirement {competency?.minimum_requirement} points
						</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

export default CompetencyInformationBox;

const styles = StyleSheet.create({
	box: {
		marginHorizontal: 10,
		marginVertical: 3,
		padding: 20,
		borderRadius: 10,
		justifyContent: 'center',
	},

	fullSize: {
		justifyContent: 'space-evenly',
	},

	titleText: {
		fontSize: 16,
		fontWeight: 'bold',
		textTransform: 'capitalize',
		letterSpacing: 2,
	},

	contentText: {
		color: '#74787e',
		letterSpacing: 1.5,
	},
});
