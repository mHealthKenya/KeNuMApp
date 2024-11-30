import {useRouter} from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {View} from 'react-native';
import {Button, Icon} from 'react-native-paper';
import {useAuth} from '../../providers/auth';
import {Text} from '../Themed';

const CPDHome = () => {
	const {user} = useAuth();
	const router = useRouter();

	return (
		<View
			className='m-2 rounded-lg shadow-sm'
			style={{
				backgroundColor: '#fbf8e3',
				padding: 8,
			}}>
			{/* Header Section */}
			<View className='flex-row items-center mb-2'>
				<Icon source='alert' size={24} color='#a28c60' />
				<Text
					className='text-lg ml-2'
					style={{
						color: '#a28c60',
					}}
					bold>
					Please Note
				</Text>
			</View>

			{/* Information Section */}
			<Text
				className='text-base mb-2'
				style={{
					color: '#000000',
					lineHeight: 20,
				}}>
				All practitioners must earn at least 20 CPD points per calendar year to qualify for license retention in the annual
				register.
			</Text>

			{/* Points Status Section */}
			<Text
				className='text-xl mb-3'
				style={{
					color:
						user?.cpd?.length && Number(user.cpd[0].current_points) >= Number(user.cpd[0].cpd_requirement)
							? '#3b763d'
							: '#D6512C',
				}}
				bold>
				You have attained <Text italic>{user?.cpd?.length ? user.cpd[0].current_points : 0}</Text> out of{' '}
				<Text italic>{user?.cpd?.length ? user.cpd[0].cpd_requirement : 20}</Text> required points.
			</Text>

			{/* Buttons Section */}
			<View
				className='flex-row justify-between'
				style={{
					gap: 8,
				}}>
				<Button
					mode='contained'
					onPress={() => router.push('/cpds')}
					style={{
						flex: 1,
						borderRadius: 8,
						backgroundColor: '#339934',
					}}>
					View Points
				</Button>
				<Button
					mode='contained'
					onPress={() => WebBrowser.openBrowserAsync('https://osp.nckenya.com/files?type=cpd_tutorial')}
					style={{
						flex: 1,
						borderRadius: 8,
						backgroundColor: '#35a6f1',
					}}>
					Tutorial
				</Button>
			</View>
		</View>
	);
};

export default CPDHome;
