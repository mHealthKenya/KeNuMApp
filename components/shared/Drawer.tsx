import {
	DrawerContentComponentProps,
	DrawerContentScrollView,
	DrawerItem,
	DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import {View} from 'react-native';
import {Divider, Icon} from 'react-native-paper';
import {useAuth} from '../../providers/auth';
import DrawerHeader from './DrawerHeader';

const CustomDrawer = (props: DrawerContentComponentProps) => {
	const {logout} = useAuth();
	return (
		<View style={[{flex: 1}]}>
			<DrawerContentScrollView
				style={{
					marginTop: -52,
					zIndex: 10,
				}}>
				<DrawerHeader />
				<View style={{flex: 1, paddingTop: 10}}>
					<DrawerItemList {...props} />
				</View>
			</DrawerContentScrollView>
			<View style={{flex: 1}}>
				<Divider />
				{/* <DrawerItem
					label='About'
					onPress={() => {}}
					icon={() => <Icon source='information-outline' size={40} color='#0445b5' />}
				/> */}
				{/* <DrawerItem
					label='Support'
					onPress={() => {}}
					icon={() => <Icon source='help-circle-outline' size={40} color='#0445b5' />}
				/> */}
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
