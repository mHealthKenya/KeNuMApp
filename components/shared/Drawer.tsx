import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import globalStyles from '../../styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
	DrawerContentComponentProps,
	DrawerContentScrollView,
	DrawerItem,
	DrawerItemList,
} from '@react-navigation/drawer';
import DrawerHeader from './DrawerHeader';
import { Divider, Icon } from 'react-native-paper';
import { Image } from 'expo-image';
import { useAuth } from '../../providers/auth';

const CustomDrawer = (props: DrawerContentComponentProps) => {
	const { user, logout } = useAuth();
	return (
		<View style={[{ flex: 1 }]}>
			<DrawerContentScrollView
				style={{
					marginTop: -52,
					zIndex: 10,
				}}>
				<DrawerHeader />
				<View style={{ flex: 1, paddingTop: 10 }}>
					<DrawerItemList {...props} />
				</View>
			</DrawerContentScrollView>
			<View style={{ flex: 1 }}>
				<Divider />
				<DrawerItem
					label='About'
					onPress={() => {}}
					icon={() => (
						<Icon source='information-outline' size={40} color='#0445b5' />
					)}
				/>
				<DrawerItem
					label='Support'
					onPress={() => {}}
					icon={() => (
						<Icon source='help-circle-outline' size={40} color='#0445b5' />
					)}
				/>
				<Divider />
				<DrawerItem
					label='Logout'
					onPress={() => logout()}
					icon={() => <Icon source='logout' size={40} color='#0445b5' />}
				/>
			</View>
		</View>
	);
};

export default CustomDrawer;

const styles = StyleSheet.create({
	otherItems: {
		backgroundColor: '#f0f6fb',
	},
});
