import dayjs from 'dayjs';
import {Image} from 'expo-image';
import {useRouter} from 'expo-router';
import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Divider} from 'react-native-paper';
import {useAuth} from '../../../providers/auth';
import {Text} from '../../Themed';

const InvalidLicenceComponent = () => {
	const {user} = useAuth();

	const router = useRouter();

	return (
		<View
			style={{
				backgroundColor: '#D6512C',
			}}
			className='flex flex-1 m-2 rounded-xl justify-between shadow-md'>
			<View className='flex flex-row'>
				<View className='flex  flex-col p-2 justify-between'>
					<View className='flex flex-row gap-2'>
						<View className='w-[30%] h-[60%]'>
							<Image
								source={require('../../../assets/images/danger.png')}
								style={{
									height: 90,
									width: 'auto',
								}}
								className='mr-3'
							/>
						</View>

						<Text
							className='font-bold tracking-widest text-2xl'
							style={{
								color: '#FFE6D7',
							}}
							bold>
							Attention Required!
						</Text>
					</View>

					<View>
						<Text
							className='tracking-wide text-lg'
							style={{
								color: '#FFE6D7',
							}}>
							You have an expired licence. Please renew your licence for uninterrupted and compliant practice.
						</Text>
					</View>
				</View>
				<View
					style={{
						height: 'auto',
					}}
					className='justify-center items-center'>
					<Image source={require('../../../assets/images/invalidlicence.png')} />
				</View>
			</View>

			<View className='p-2'>
				<Divider />
			</View>

			<View
				className='p-2'
				style={{
					height: 'auto',
				}}>
				<Button mode='contained' style={styles.button} icon='arrow-right' onPress={() => router.push('/licencehome')}>
					Renew Licence
				</Button>
			</View>
		</View>
	);
};

export default InvalidLicenceComponent;

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#339934',
		borderRadius: 10,
	},
});
