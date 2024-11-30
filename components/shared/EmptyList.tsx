import {Alert, AlertIcon, AlertText, InfoIcon} from '@gluestack-ui/themed';
import React, {FC} from 'react';
import {StyleSheet} from 'react-native';

const EmptyList: FC<{message: string}> = ({message}) => {
	return (
		<Alert my='$2.5' mx='$2.5' action='info' variant='solid'>
			<AlertIcon as={InfoIcon} mr='$3' />
			<AlertText style={styles.text}>{message}</AlertText>
		</Alert>
	);
};

export default EmptyList;

const styles = StyleSheet.create({
	text: {
		fontSize: 16,
		letterSpacing: 2,
	},
});
