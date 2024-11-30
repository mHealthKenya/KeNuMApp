import {useRouter} from 'expo-router';
import React, {FC} from 'react';
import {Pressable, StyleSheet, View, useWindowDimensions} from 'react-native';
import {Icon} from 'react-native-paper';
import globalStyles from '../../styles/global';
import {Text} from '../Themed';

export interface ContentBox {
	title: string;
	id: string;
}

const ContentBox: FC<{
	box: ContentBox;
	action: (item: ContentBox) => void;
}> = ({box, action}) => {
	const {width, height} = useWindowDimensions();
	const actualWidth = Math.min(width, height);
	const usableWidth = actualWidth - 20;
	const router = useRouter();

	return (
		<Pressable
			style={[
				styles.box,
				{
					width: usableWidth,
					backgroundColor: '#FFFFFF',
					flex: 1,
				},
			]}
			onPress={() => action(box)}>
			<View style={[globalStyles.row, {justifyContent: 'space-between', alignItems: 'center'}]}>
				<View
					style={[
						globalStyles.column,
						{
							width: usableWidth * 0.8,
						},
					]}>
					<View
						style={{
							padding: 10,
						}}>
						<Text className='text-lg'>{box.title}</Text>
					</View>
				</View>
				<Icon size={30} source='chevron-right' />
			</View>
		</Pressable>
	);
};

export default ContentBox;

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
		color: 'black',
		letterSpacing: 2,
		fontSize: 16,
		textTransform: 'capitalize',
	},
});
