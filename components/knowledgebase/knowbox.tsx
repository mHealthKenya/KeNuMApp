import * as WebBrowser from 'expo-web-browser';
import React, {FC} from 'react';
import {Pressable, StyleSheet, View, useWindowDimensions} from 'react-native';
import {Divider, Icon} from 'react-native-paper';
import {baseUrl} from '../../constants/baseurl';
import {KnowledgeBase} from '../../models/knowledgebase';
import globalStyles from '../../styles/global';
import {Text} from '../Themed';

export interface KnowBox {
	title: string;
	content: string;
}

const KnowledgeBox: FC<{box?: KnowledgeBase; routing?: KnowBox}> = ({box}) => {
	const {width, height} = useWindowDimensions();
	const actualWidth = Math.min(width, height);
	const usableWidth = actualWidth - 20;

	return (
		<Pressable
			style={[
				styles.box,
				{
					width: usableWidth,
					backgroundColor: '#dcf0fa',
				},
			]}
			onPress={() => WebBrowser.openBrowserAsync(baseUrl + box?.content)}>
			<View style={[globalStyles.row, {justifyContent: 'space-between', alignItems: 'center'}]}>
				<View className='flex flex-col'>
					<View
						style={{
							paddingHorizontal: 10,
						}}>
						<Text>{box?.title}</Text>
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
						<Text style={styles.contentText}>{box?.subtitle}</Text>
					</View>
				</View>
				<Icon size={30} source='chevron-right' />
			</View>
		</Pressable>
	);
};

export default KnowledgeBox;

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
