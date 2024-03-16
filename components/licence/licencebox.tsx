import React, {FC} from 'react';
import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import {Divider} from 'react-native-paper';
import globalStyles from '../../styles/global';
import {useAtom} from 'jotai';
import {diasporaAtom} from '../../atoms/diaporaatom';

export interface Item {
	title: string;
	id: string;
}

const LicenceApplyBox: FC<{county: Item; workstation: Item}> = ({county, workstation}) => {
	const {width, height} = useWindowDimensions();
	const actualWidth = Math.min(width, height);
	const usableWidth = actualWidth - 20;
	const [diaspora, _] = useAtom(diasporaAtom);

	return (
		<View
			style={[
				styles.box,
				{
					width: usableWidth,
					height: height * 0.17,
					backgroundColor: '#FFF',
				},
			]}>
			<View style={[globalStyles.row, {justifyContent: 'space-between', alignItems: 'center'}]}>
				<View style={[globalStyles.column]}>
					<View
						style={{
							paddingHorizontal: 10,
						}}>
						<Text style={styles.titleText}>{diaspora ? 'Diaspora' : county.title}</Text>
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
						<Text style={styles.contentText}>{diaspora ? 'Out country application' : workstation.title}</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

export default LicenceApplyBox;

const styles = StyleSheet.create({
	box: {
		margin: 10,
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
