import { useRouter } from 'expo-router';
import React, { FC } from 'react';
import {
	Pressable,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from 'react-native';
import { Divider, Icon } from 'react-native-paper';
import { RotationCompetency } from '../../../models/rotationcompetencies';
import { useFetchedCompetency } from '../../../providers/competency';
import globalStyles from '../../../styles/global';

const RotationCompetencyBox: FC<{ competency: RotationCompetency }> = ({
	competency,
}) => {
	const { width, height } = useWindowDimensions();
	const actualWidth = Math.min(width, height);
	const usableWidth = actualWidth - 20;

	const { handleCompetency } = useFetchedCompetency();

	const router = useRouter();

	const handleRedirect = (competency: RotationCompetency) => {
		handleCompetency(competency);
		router.push('/competencyadd');
	};

	return (
		<Pressable
			style={[
				styles.box,
				{
					width: usableWidth,
					height: height * 0.17,
					backgroundColor: '#dcf0fa',
				},
			]}
			onPress={() => handleRedirect(competency)}>
			<View
				style={[
					globalStyles.row,
					{ justifyContent: 'space-between', alignItems: 'center' },
				]}>
				<View
					style={[
						globalStyles.column,
						{
							width: usableWidth * 0.8,
							justifyContent: 'space-between',
						},
					]}>
					<View
						style={{
							paddingHorizontal: 10,
						}}>
						<Text style={styles.titleText}>{competency.competency}</Text>
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
							Minimum Requirement {competency.minimum_requirement} points
						</Text>
					</View>
				</View>

				<Icon size={30} source='chevron-right' />
			</View>
		</Pressable>
	);
};

export default RotationCompetencyBox;

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
