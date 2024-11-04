import {useRouter} from 'expo-router';
import React, {FC} from 'react';
import {Pressable, StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import {Divider, Icon} from 'react-native-paper';
import globalStyles from '../../styles/global';

export interface KnowBox {
	title: string;
	content: string;
	url: string;
}

const HomeBox: FC<{routing: KnowBox}> = ({routing}) => {
	const {width, height} = useWindowDimensions();
	const actualWidth = Math.min(width, height);
	const usableWidth = actualWidth - 20;

	const router = useRouter();

	const handlePress = (item: string) => {
		console.log(item);
		router.push(item);
	};

	return (
		<Pressable
			style={[
				styles.box,
				{
					width: usableWidth,
					backgroundColor: '#dcf0fa',
				},
			]}
			onPress={() => handlePress(routing.url)}>
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
							paddingHorizontal: 10,
						}}>
						<Text style={styles.titleText}>{routing.title}</Text>
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
						<Text style={styles.contentText}>{routing.content}</Text>
					</View>
				</View>
				<Icon size={30} source='chevron-right' />
			</View>
		</Pressable>
	);
};

export default HomeBox;

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
