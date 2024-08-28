import {Image} from 'expo-image';
import * as Print from 'expo-print';
import React from 'react';
import {Pressable, StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import {Divider, Icon} from 'react-native-paper';
import {licenceGenerator} from '../../helpers/licencegenerator';
import {useAuth} from '../../providers/auth';
import globalStyles from '../../styles/global';

const DownloadBox = () => {
	const {width, height} = useWindowDimensions();
	const actualWidth = Math.min(width, height);
	const usableWidth = actualWidth - 20;

	const {user} = useAuth();

	const printLicence = async () => {
		const html = await licenceGenerator(user);
		await Print.printAsync({
			html,
			// printerUrl: selectedPrinter?.url,
		}).catch(() => {
			return;
		});
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
			onPress={async () => await printLicence()}>
			<View style={[globalStyles.row, {justifyContent: 'space-between', alignItems: 'center'}]}>
				<Image
					source={require('../../assets/images/licencesmall.png')}
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
						<Text style={styles.titleText}>Download Licence</Text>
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
						<Text style={styles.contentText}>Click on this card to download your licence</Text>
					</View>
				</View>
				<Icon size={30} source='download' />
			</View>
		</Pressable>
	);
};

export default DownloadBox;

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
