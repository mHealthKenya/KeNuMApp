import { Alert, AlertIcon, AlertText, InfoIcon } from '@gluestack-ui/themed';
import React, { FC } from 'react';

const InfoAlert: FC<{ message: string }> = ({ message }) => {
	return (
		<Alert action='info' variant='solid' mx='$2.5'>
			<AlertIcon as={InfoIcon} mr='$3' />
			<AlertText>{message}</AlertText>
		</Alert>
	);
};

export default InfoAlert;
