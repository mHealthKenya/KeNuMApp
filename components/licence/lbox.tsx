import {Image, ImageSource} from 'expo-image';
import {useRouter} from 'expo-router';
import React, {FC} from 'react';
import {Pressable, StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import {Divider, Icon} from 'react-native-paper';
import globalStyles from '../../styles/global';
import * as Print from 'expo-print';
import {licenceGenerator} from '../../helpers/licencegenerator';
import {useAuth} from '../../providers/auth';

export interface LicenceBox {
	title: string;
	content: string;
	backgroundColor: string;
	path: ImageSource;
	route: any;
	action?: () => void;
	danger?: boolean;
}

const LBox: FC<{box: LicenceBox}> = ({box}) => {
	const {width, height} = useWindowDimensions();
	const actualWidth = Math.min(width, height);
	const usableWidth = actualWidth - 20;
	const router = useRouter();

	const handlePress = () => {
		if (box.action) {
			box.action();
		}
		router.push(box.route);
	};

	return (
		<Pressable
			style={[
				styles.box,
				{
					width: usableWidth,
					backgroundColor: box.backgroundColor,
				},
			]}
			onPress={() => handlePress()}>
			<View style={[globalStyles.row, {justifyContent: 'space-between', alignItems: 'center'}]}>
				<Image
					source={box.path}
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
						<Text
							style={[
								styles.titleText,
								{
									color: box.danger ? '#FFF' : '#000000',
								},
							]}>
							{box.title}
						</Text>
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
						<Text
							style={[
								styles.contentText,
								{
									color: box.danger ? '#FFF' : '#74787e',
								},
							]}>
							{box.content}
						</Text>
					</View>
				</View>
				<Icon size={30} source='chevron-right' color={box.danger ? '#FFF' : '#000'} />
			</View>
		</Pressable>
	);
};

export default LBox;

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
		letterSpacing: 1.5,
	},
});
