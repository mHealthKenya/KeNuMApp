import {useRouter} from 'expo-router';
import {ExpoRouter} from 'expo-router/types/expo-router';
import React, {FC} from 'react';
import {Pressable, StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import {Divider, Icon} from 'react-native-paper';
import {useKnowledgeFetched} from '../../providers/knowledge';
import globalStyles from '../../styles/global';

export interface KnowBox {
	title: string;
	content: string;
}

const SharedBox: FC<{route: ExpoRouter.Href; title: string; subtitle: string}> = ({route, title, subtitle}) => {
	const router = useRouter();
	const {width, height} = useWindowDimensions();
	const actualWidth = Math.min(width, height);
	const usableWidth = actualWidth - 20;

	const {handleItem} = useKnowledgeFetched();

	const handlePress = () => {
		router.push(route);
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
			onPress={handlePress}>
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
						<Text style={styles.titleText}>{title}</Text>
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
						<Text style={styles.contentText}>{subtitle}</Text>
					</View>
				</View>
				<Icon size={30} source='chevron-right' />
			</View>
		</Pressable>
	);
};

export default SharedBox;

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
