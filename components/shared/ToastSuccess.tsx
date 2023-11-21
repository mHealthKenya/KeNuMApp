import {
	Toast,
	ToastDescription,
	ToastTitle,
	VStack,
} from '@gluestack-ui/themed';
import React, { FC } from 'react';
import { useWindowDimensions } from 'react-native';

const ToastSuccess: FC<{ id: any; title: string; description: string }> = ({
	id,
	title,
	description,
}) => {
	const { width } = useWindowDimensions();

	return (
		<Toast
			nativeID={'toast-' + id}
			action='success'
			variant='accent'
			style={[
				{
					width: width * 0.95,
				},
			]}>
			<VStack space='xs'>
				<ToastTitle>{title}</ToastTitle>
				<ToastDescription>{description}</ToastDescription>
			</VStack>
		</Toast>
	);
};

export default ToastSuccess;
