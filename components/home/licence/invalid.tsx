import dayjs from 'dayjs';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Divider } from 'react-native-paper';
import { useAuth } from '../../../providers/auth';

const InvalidLicenceComponent: FC<{ width: number; height: number }> = ({
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

	const router = useRouter();

	return (
		<View
			style={{
				height: 'auto',
				backgroundColor: '#FFE6D7',
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
								color: '#D6512C',
							}}>
							Attention Required!
						</Text>
					</View>

					<View>
						<Text
							className='tracking-widest'
							style={{
								color: '#D6512C',
							}}>
							You have an expired licence. Please renew your licence for
							uninterrupted and compliant practice.
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
						source={require('../../../assets/images/invalidlicence.png')}
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
					icon='arrow-right'
					onPress={() => router.push('/licencehome')}>
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
