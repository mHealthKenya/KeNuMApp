import dayjs from 'dayjs';
import {Image} from 'expo-image';
import * as Print from 'expo-print';
import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {licenceGenerator} from '../../../helpers/licencegenerator';
import {useAuth} from '../../../providers/auth';
import {Text} from '../../Themed';

const HomeLicenceComponent = () => {
	const {user} = useAuth();

	const endDate = user?.license?.length ? dayjs(new Date(user?.license[0].to_date || '')) : dayjs(new Date());

	const currentDate = dayjs(new Date());
	const diff = Math.ceil(endDate.diff(currentDate) / 86400000);

	const printLicence = async () => {
		const html = await licenceGenerator(user);

		await Print.printAsync({
			html,
		}).catch(() => {
			return;
		});
	};

	return (
		<View
			style={{
				backgroundColor: '#dfefd8',
				padding: 8,
			}}
			className='m-2 rounded-lg shadow-sm'>
			{/* Top Section */}
			<View className='flex-row items-center mb-2 gap-5'>
				<View className='w-[30%]'>
					<Image
						source={require('../../../assets/images/validlicence.png')}
						style={{
							height: 90,
							width: 'auto',
						}}
						className='mr-3'
					/>
				</View>

				<View className='flex flex-1 flex-col gap-2 p-2'>
					<View style={{flex: 1}}>
						<Text className='text-2xl tracking-wide' bold>
							Well Done!
						</Text>
						<Text className='text-lg'>
							Your licence is active and will expire in <Text className='font-bold'>{diff}</Text> days.
						</Text>
					</View>
					<View className='flex-row justify-between items-center'>
						<Text className='text-base'>
							Status: <Text className='text-base'>Active</Text>
						</Text>
						<Text className='text-base'>
							Days Left: <Text className='text-base'>{diff}</Text>
						</Text>
					</View>
				</View>
			</View>

			{/* Status Section */}

			<Button mode='contained' style={styles.button} icon='download' onPress={async () => await printLicence()}>
				Download
			</Button>
		</View>
	);
};

export default HomeLicenceComponent;

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#339934',
		borderRadius: 8,
		height: 36,
		justifyContent: 'center',
		paddingHorizontal: 8,
	},
});
