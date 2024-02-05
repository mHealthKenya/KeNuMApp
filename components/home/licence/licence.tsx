import dayjs from 'dayjs';
import { Image } from 'expo-image';
import * as Print from 'expo-print';
import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Divider } from 'react-native-paper';
import { licenceGenerator } from '../../../helpers/licencegenerator';
import { useAuth } from '../../../providers/auth';

const HomeLicenceComponent: FC<{ width: number; height: number }> = ({
	width,
	height,
}) => {
	const { user } = useAuth();

	const endDate = user?.license?.length
		? dayjs(new Date(user?.license[0].to_date || ''))
		: dayjs(new Date());

	const currentDate = dayjs(new Date());

	const diff = Math.ceil(endDate.diff(currentDate) / 86400000);

	const usableWidth = width - 4;

	const printLicence = async () => {
		await Print.printAsync({
			html: licenceGenerator(user),
			// printerUrl: selectedPrinter?.url,
		}).catch(() => {
			return;
		});
	};

	return (
		<View
			style={{
				height: 'auto',
				backgroundColor: '#dfefd8',
			}}
			className='m-2 rounded-xl justify-between shadow-md'>
			<View className='flex flex-row'>
				<View
					className='p-2 flex-col justify-between'
					style={{
						height: 'auto',
						width: usableWidth * 0.7,
					}}>
					<View>
						<Text
							className='font-bold tracking-widest text-xl'
							style={{
								color: '#3b763d',
							}}>
							Well Done!
						</Text>
					</View>

					<View>
						<Text
							className='tracking-widest'
							style={{
								color: '#3b763d',
							}}>
							Your licence is active. Your practicing licence will expire within{' '}
							<Text className='font-bold text-md'>{diff}</Text> days from now
						</Text>
					</View>
				</View>
				<View
					style={{
						height: 'auto',
						width: usableWidth * 0.3,
					}}
					className='justify-center items-center'>
					<Image
						source={require('../../../assets/images/validlicence.png')}
						style={{
							height: height * 0.08,
							width: usableWidth * 0.18,
						}}
					/>
				</View>
			</View>

			<View
				className='p-2'
				style={{
					height: height * 0.005,
				}}>
				<Divider />
			</View>

			<View
				className='p-2'
				style={{
					height: 'auto',
				}}>
				<Button
					mode='contained'
					style={styles.button}
					icon='download'
					onPress={async () => await printLicence()}>
					Download Licence
				</Button>
			</View>
		</View>
	);
};

export default HomeLicenceComponent;

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#339934',
		borderRadius: 10,
	},
});
