import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { Alert, AlertIcon, AlertText, InfoIcon } from '@gluestack-ui/themed';

const WarnAlert: FC<{ message: string }> = ({ message }) => {
	return (
		<Alert action='warning' variant='solid' mx='$2.5'>
			<AlertIcon as={InfoIcon} mr='$3' />
			<AlertText>{message}</AlertText>
		</Alert>
	);
};

export default WarnAlert;
