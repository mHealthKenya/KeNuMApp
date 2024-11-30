import {Image, ImageSource} from 'expo-image';
import {useRouter} from 'expo-router';
import React, {FC} from 'react';
import {Pressable, ScrollView, StyleSheet, View, useWindowDimensions} from 'react-native';
import {Series} from '../../models/series';
import globalStyles from '../../styles/global';
import InfoAlert from '../shared/InfoAlert';
import {Text} from '../Themed';

export interface InternBox {
	title: string;
	content: string;
	backgroundColor: string;
	path: ImageSource;
	route: any;
}

const SeriesBox: FC<{series: Series}> = ({series}) => {
	const router = useRouter();

	return (
		<Pressable
			className='flex bg-[#FFFFFF] m-2 p-2 rounded-lg'
			disabled={series.application_status === 'closed'}
			onPress={() =>
				router.push({
					pathname: '/applyexam',
					params: {
						student_series_id: series.student_series_id,
					},
				})
			}>
			<View className='flex flex-row'>
				<View>
					<Image
						source={require('../../assets/images/rotationssmall.png')}
						style={{
							width: 60,
							height: 80,
						}}
					/>
				</View>
				<View className='flex flex-1 ml-2 p-2'>
					<View className='flex flex-1 flex-col gap-2'>
						<Text className='text-xl' bold>
							Exam Series
						</Text>
						<View className='flex flex-1 flex-col gap-2'>
							<Text className='text-lg'>{series.cadre}</Text>

							<View className='flex flex-row gap-2'>
								<Text style={[styles.contentText, series.application_status === 'closed' && styles.closedText]}>
									{series.exams_series} -{' '}
								</Text>
								<Text style={[styles.contentText, series.application_status === 'closed' && styles.closedText]}>
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

const SeriesComponent: FC<{serie: Series[]}> = ({serie}) => {
	const {height, width} = useWindowDimensions();
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

			{serie?.length === 0 ? (
				<InfoAlert message='No active series found in your account' />
			) : (
				serie?.map((item) => <SeriesBox series={item} key={item.student_series_id} />)
			)}
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
