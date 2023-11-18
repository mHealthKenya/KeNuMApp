import { useRouter } from 'expo-router';
import React, { FC } from 'react';
import {
	Pressable,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from 'react-native';
import { ActivityIndicator, Icon } from 'react-native-paper';
import globalStyles from '../../../styles/global';
import useRotationAreas from '../../../services/internship/rotationareas';
import { primaryColor } from '../../../constants/Colors';
import { useFetchedRotationAreas } from '../../../providers/rotationareas';

export interface InternShipArea {
	title: string;
	id: string;
}

const InternshipAreaBox: FC<{ item: InternShipArea }> = ({ item }) => {
	const { width, height } = useWindowDimensions();
	const actualWidth = Math.min(width, height);
	const usableWidth = actualWidth - 20;
	const router = useRouter();

	const { areas } = useFetchedRotationAreas();

	const successFn = () => {
		router.push('/rotationareas');
	};

	const { mutate, isPending } = useRotationAreas(successFn);

	return (
		<Pressable
			style={[
				styles.box,
				{
					width: usableWidth,
					height: height * 0.15,
					backgroundColor: '#dcf0fa',
				},
			]}
			onPress={() =>
				mutate({
					internship_area_id: item.id,
				})
			}>
			<View
				style={[
					{ justifyContent: 'space-between', alignItems: 'center' },
					globalStyles.row,
				]}>
				<View
					style={[
						{
							width: usableWidth * 0.8,
						},
					]}>
					<View
						style={{
							paddingHorizontal: 10,
						}}>
						<Text style={styles.titleText}>{item.title}</Text>
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

export default InternshipAreaBox;

const styles = StyleSheet.create({
	box: {
		marginHorizontal: 10,
		marginVertical: 3,
		padding: 10,
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
