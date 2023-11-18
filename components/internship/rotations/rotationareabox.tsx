import { ImageSource } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { FC } from 'react';
import {
	Pressable,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from 'react-native';
import { ActivityIndicator, Divider, Icon } from 'react-native-paper';
import { primaryColor } from '../../../constants/Colors';
import { RotationArea } from '../../../models/rotationareas';
import useRotationCompetencies from '../../../services/internship/rotationcompetencies';
import globalStyles from '../../../styles/global';

export interface InternBox {
	title: string;
	content: string;
	backgroundColor: string;
	path: ImageSource;
	route: any;
}

const RotationAreaBox: FC<{ area: RotationArea }> = ({ area }) => {
	const { width, height } = useWindowDimensions();
	const actualWidth = Math.min(width, height);
	const usableWidth = actualWidth - 20;

	const router = useRouter();

	const successFn = () => {
		router.push('/competencies');
	};

	const { mutate, isPending } = useRotationCompetencies(successFn);

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
			onPress={() =>
				mutate({
					rotation_id: area.rotation_id,
				})
			}>
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
						<Text style={styles.titleText}>{area.rotation_area}</Text>
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
							Required duration {area.rotation_duration} days
						</Text>
					</View>
				</View>
				{isPending ? (
					<ActivityIndicator size={30} color={primaryColor} />
				) : (
					<Icon size={30} source='chevron-right' />
				)}
			</View>
		</Pressable>
	);
};

export default RotationAreaBox;

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
