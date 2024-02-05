import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { Button, Divider, Icon } from 'react-native-paper';
import { useAuth } from '../../providers/auth';
import * as WebBrowser from 'expo-web-browser';
import { useRouter } from 'expo-router';
const CPDHome: FC<{ width: number; height: number }> = ({ width, height }) => {
	const { user } = useAuth();
	const router = useRouter();

	const availableWidth = width - 8;
	return (
		<View
			className='m-2 rounded-xl shadow-md'
			style={{
				height: 'auto',
				backgroundColor: '#fbf8e3',
			}}>
			<View className='flex flex-col justify-between'>
				<View className='flex flex-row p-2'>
					<View
						style={{
							height: height * 0.05,
						}}
						className='justify-center'>
						<Icon source='alert' size={30} color='#a28c60' />
					</View>

					<View
						style={{
							height: height * 0.05,
						}}
						className='justify-center ml-3'>
						<Text
							className='font-bold tracking-widest text-xl'
							style={{
								color: '#a28c60',
							}}>
							Please Note
						</Text>
					</View>
					<Divider />
				</View>
				<View
					style={{
						height: 'auto',
					}}
					className='p-2 mb-3 flex flex-col justify-between'>
					<View
						style={{
							height: 'auto',
						}}>
						<Text
							className='tracking-widest'
							style={{
								color: '#a28c60',
							}}>
							All practitioners are required to attain a minimum of 20 CPD
							points per CPD calendar year before expiry of the license to
							qualify for retention in the annual register
						</Text>
					</View>

					<View
						style={{
								height: 'auto',
						}}
						className='my-2'>
						<Text
							className='tracking-widest font-bold text-md'
							style={{
								color:
									user &&
									user?.cpd &&
									Number(user?.cpd[0]?.current_points!) >
										Number(user?.cpd[0]?.cpd_requirement!)
										? '#3b763d'
										: '#D6512C',
							}}>
							You have attained{' '}
							<Text className='font-extrabold'>
								{user?.cpd?.length ? user?.cpd[0].current_points : 0}
							</Text>{' '}
							of the required{' '}
							<Text className='font-extrabold'>
								{user?.cpd?.length ? user?.cpd[0].cpd_requirement : 20}
							</Text>
						</Text>
				</View>


				</View>
				<View
					className='p-2 flex-row gap-2 mb-3'
					style={{
						height: 'auto',
					}}>
					<Button
						mode='contained'
						style={{
							width: availableWidth * 0.45,
							borderRadius: 10,
							backgroundColor: '#339934',
						}}
						onPress={() => {
							router.push('/cpds');
						}}>
						View Points
					</Button>
					<Button
						mode='contained'
						onPress={() =>
							WebBrowser.openBrowserAsync(
								'https://osp.nckenya.com/files?type=cpd_tutorial'
							)
						}
						style={{
							width: availableWidth * 0.45,
							borderRadius: 10,
							backgroundColor: '#35a6f1',
						}}>
						Download Tutorial
					</Button>
				</View>
			</View>
		</View>
	);
};

export default CPDHome;
