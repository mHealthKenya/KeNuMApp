import { Image, ImageSource } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { FC } from 'react';
import {
	FlatList,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from 'react-native';
import { Series } from '../../models/series';
import globalStyles from '../../styles/global';

export interface InternBox {
	title: string;
	content: string;
	backgroundColor: string;
	path: ImageSource;
	route: any;
}

const SeriesBox: FC<{ series: Series }> = ({ series }) => {
	const { width, height } = useWindowDimensions();
	const actualWidth = Math.min(width, height);
	const usableWidth = actualWidth - 20;
	const router = useRouter();

	return (
		<Pressable
			style={[
				styles.box,
				{
					width: usableWidth,
					height: height * 0.17,
					// backgroundColor: '#dcf0fa',
					backgroundColor: '#FFF',
					flex: 1,
					justifyContent: 'space-evenly',
				},
			]}
			onPress={() =>
				router.push({
					pathname: '/applyexam',
					params: {
						student_series_id: series.student_series_id,
					},
				})
			}>
			<View style={globalStyles.row}>
				<View>
					<Image
						source={require('../../assets/images/rotationssmall.png')}
						style={{
							width: 60,
							height: 80,
						}}
					/>
				</View>
				<View style={{ marginLeft: 10, padding: 10, flex: 1 }}>
					<View style={[globalStyles.column, { gap: 10, flex: 1 }]}>
						<Text style={styles.titleText}>Exam Series</Text>
						<View style={[{ flex: 1, gap: 10 }, globalStyles.column]}>
							<Text style={styles.contentText}>{series.cadre}</Text>

							<View style={[globalStyles.row, { gap: 10 }]}>
								<Text
									style={[
										styles.contentText,
										series.application_status === 'closed' && styles.closedText,
									]}>
									{series.exams_series} -{' '}
								</Text>
								<Text
									style={[
										styles.contentText,
										series.application_status === 'closed' && styles.closedText,
									]}>
									{series.application_status}
								</Text>
							</View>
						</View>
					</View>
				</View>
			</View>
		</Pressable>
	);
};

const SeriesComponent: FC<{ serie: Series[] }> = ({ serie }) => {
	const { height, width } = useWindowDimensions();
	return (
		<ScrollView style={globalStyles.container}>
			<View
				style={{
					height: height * 0.4,
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<Image
					source={require('../../assets/images/examlarge.png')}
					style={{
						width: width * 0.9,
						height: height * 0.3,
					}}
				/>
			</View>
			{serie?.map((item) => (
				<SeriesBox series={item} key={item.student_series_id} />
			))}
		</ScrollView>
	);
};

export default SeriesComponent;

const styles = StyleSheet.create({
	box: {
		marginHorizontal: 10,
		marginVertical: 3,
		padding: 20,
		borderRadius: 10,
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
		textTransform: 'capitalize',
	},

	closedText: {
		color: '#ff7b7b',
	},
});
