import { Image, ImageSource } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import {
	Pressable,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from 'react-native';
import { Divider, Icon } from 'react-native-paper';
import globalStyles from '../../../styles/global';

export interface InternBox {
	title: string;
	content: string;
	backgroundColor: string;
	path: ImageSource;
	route: any;
}

const TransfersBox = () => {
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
					backgroundColor: '#dcf0fa',
					flex: 1,
				},
			]}
			onPress={() => router.push('/transfer')}>
			<View
				style={[
					globalStyles.row,
					{ justifyContent: 'space-between', alignItems: 'center' },
				]}>
				<Image
					source={require('../../../assets/images/transfersmall.png')}
					style={{
						width: 60,
						height: 80,
					}}
				/>
				<View
					style={[
						globalStyles.column,
						{
							width: usableWidth * 0.6,
						},
					]}>
					<View
						style={{
							paddingHorizontal: 10,
						}}>
						<Text style={styles.titleText}>Internship transfer</Text>
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
							Apply for a change of internship center
						</Text>
					</View>
				</View>
				<Icon size={30} source='chevron-right' />
			</View>
		</Pressable>
	);
};

export default TransfersBox;

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
