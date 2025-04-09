import React, {FC} from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import {primaryColor} from '../../constants/Colors';

const PayButton: FC<{handlePay: () => Promise<void>}> = ({handlePay}) => {
	return (
		<View className='my-2'>
			<Button
				mode='contained'
				style={{
					borderRadius: 5,
					backgroundColor: primaryColor,
				}}
				onPress={handlePay}>
				Pay Now
			</Button>
		</View>
	);
};

export default PayButton;
