import {Avatar, AvatarBadge, AvatarFallbackText, AvatarImage} from '@gluestack-ui/themed';
import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import {usePathname, useRouter} from 'expo-router';
import React, {FC, useEffect, useState} from 'react';
import {Pressable, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {User} from '../../models/user';
import {useAuth} from '../../providers/auth';
import useAuthenticatedUser from '../../services/auth/authenticated';
import {Text} from '../Themed';
import {useDimensions} from '../../providers/dimensions';

interface Person {
	user: User | null | undefined;
}

const Greeting = () => {
	const {data, isLoading} = useAuthenticatedUser();

	const {user} = useAuth();

	if (isLoading) {
		return <GreetingComponent person={{user}} />;
	}

	return <GreetingComponent person={{user: data}} />;
};

export default Greeting;

const GreetingComponent: FC<{person: Person}> = ({person: {user}}) => {
	const [greeting, setGreeting] = useState('');

	const {portrait} = useDimensions();

	const path = usePathname();

	const router = useRouter();

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

	const handleNavigate = () => {
		if (portrait) {
			toggleDrawer();
		} else if (path === '/profile') {
			router.push('/');
		} else {
			router.push('/profile');
		}
	};

	return (
		<SafeAreaView className='flex flex-row  items-center gap-4 bg-[#0445b5] px-2'>
			<Pressable onPress={handleNavigate}>
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
