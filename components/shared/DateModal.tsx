import { Button } from '@gluestack-ui/themed';
import {
	ButtonText,
	Modal,
	ModalBackdrop,
	ModalContent,
	ModalFooter,
} from '@gluestack-ui/themed';
import React, { FC, ReactNode, useRef } from 'react';
import { View } from 'react-native';
import { Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { primaryColor } from '../../constants/Colors';

interface CModal {
	show: boolean;
	toggleModal: () => void;
	cancelDate: () => void;
	date: Date;
	handleDate: ({ type }: any, selectedDate: any) => void;
}

const DateModal: FC<{ items: CModal }> = ({
	items: { show, toggleModal, cancelDate, date, handleDate },
}) => {
	const ref = useRef(null);
	return (
		<Modal isOpen={show} onClose={toggleModal} finalFocusRef={ref}>
			<ModalBackdrop />
			<ModalContent>
				<View>
					<DateTimePicker
						value={date}
						mode='date'
						display='spinner'
						themeVariant='dark'
						style={{
							backgroundColor: primaryColor,
							borderRadius: 10,
						}}
						minimumDate={new Date()}
						onChange={handleDate}
					/>
				</View>
				{Platform.OS === 'ios' && (
					<ModalFooter>
						<Button
							variant='outline'
							size='sm'
							action='secondary'
							mr='$3'
							onPress={cancelDate}>
							<ButtonText>Cancel</ButtonText>
						</Button>
						<Button
							size='sm'
							action='positive'
							borderWidth='$0'
							onPress={toggleModal}>
							<ButtonText>Confirm</ButtonText>
						</Button>
					</ModalFooter>
				)}
			</ModalContent>
		</Modal>
	);
};

export default DateModal;

const styles = StyleSheet.create({});
