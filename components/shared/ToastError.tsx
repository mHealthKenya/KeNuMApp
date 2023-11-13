import {
	Toast,
	ToastDescription,
	ToastTitle,
	VStack,
} from '@gluestack-ui/themed';
import React, { FC } from 'react';
import { useWindowDimensions } from 'react-native';

const ToastError: FC<{ id: any; title: string; description: string }> = ({
	id,
	title,
	description,
}) => {
	const { width } = useWindowDimensions();

	return (
		<Toast
			nativeID={'toast-' + id}
			action='error'
			variant='accent'
			style={[
				{
					width: width * 0.8,
				},
			]}>
			<VStack space='xs'>
				<ToastTitle>{title}</ToastTitle>
				<ToastDescription>{description}</ToastDescription>
			</VStack>
		</Toast>
	);
};

export default ToastError;
