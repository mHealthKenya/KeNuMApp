import {Avatar, AvatarBadge, AvatarFallbackText, AvatarImage} from '@gluestack-ui/themed';
import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAuth} from '../../providers/auth';
import {Text} from '../Themed';
import {Pressable, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Greeting = () => {
	const {user} = useAuth();

	const [greeting, setGreeting] = useState('');

	const determineGreeting = () => {
		const hour = dayjs().hour();
		if (hour >= 5 && hour < 12) {
			return 'Good morning';
		} else if (hour >= 12 && hour < 17) {
			return 'Good afternoon';
		} else if (hour >= 17 && hour < 21) {
			return 'Good evening';
		} else {
			return 'Hello';
		}
	};

	useEffect(() => {
		const updateGreeting = () => {
			setGreeting(determineGreeting());
		};

		updateGreeting();
		const interval = setInterval(updateGreeting, 60000);

		return () => clearInterval(interval);
	}, [greeting]);

	const {toggleDrawer} = useNavigation<any>();

	return (
		<SafeAreaView className='flex flex-row  items-center gap-4 bg-[#0445b5] px-2'>
			<Pressable onPress={toggleDrawer}>
				<Avatar>
					<AvatarFallbackText>{user?.Name}</AvatarFallbackText>
					<AvatarImage source={user?.ProfilePic} alt={user?.Name} />
					<AvatarBadge />
				</Avatar>
			</Pressable>

			<View className='flex flex-col'>
				<Text className='tracking-wide text-white text-lg'>{greeting},</Text>
				<Text className='tracking-wide text-white text-lg text-clip whitespace-nowrap'>{user?.Name?.toUpperCase()}</Text>
			</View>
		</SafeAreaView>
	);
};

export default Greeting;