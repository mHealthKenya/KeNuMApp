import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {Divider} from 'react-native-paper';
import {RotationCompetency} from '../../../models/rotationcompetencies';
import {Text} from '../../Themed';

const CompetencyInformationBox: FC<{
	competency?: RotationCompetency | null;
}> = ({competency}) => {
	return (
		<View className='flex bg-[#FFFFFF] py-8 m-2 rounded-lg'>
			<View style={[{justifyContent: 'space-between', alignItems: 'center'}]}>
				<View className='flex flex-col gap-2'>
					<View className='p-2'>
						<Text className='text-xl' bold>
							{competency?.competency}
						</Text>
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
						<Text style={styles.contentText}>Minimum Requirement {competency?.minimum_requirement} points</Text>
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
