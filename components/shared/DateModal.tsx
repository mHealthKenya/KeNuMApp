import {Button, ButtonText, Modal, ModalBackdrop, ModalContent, ModalFooter} from '@gluestack-ui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import React, {FC, useRef} from 'react';
import {Platform, View} from 'react-native';
import {primaryColor} from '../../constants/Colors';

interface CModal {
	show: boolean;
	toggleModal: () => void;
	cancelDate: () => void;
	date: Date;
	handleDate: ({type}: any, selectedDate: any) => void;
}

const DateModal: FC<{items: CModal; minimumDate?: Date; maximumDate?: Date}> = ({
	items: {show, toggleModal, cancelDate, date, handleDate},
	minimumDate,
	maximumDate,
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
						minimumDate={minimumDate || new Date(dayjs().subtract(10, 'year').format())}
						onChange={handleDate}
						maximumDate={maximumDate}
					/>
				</View>
				{Platform.OS === 'ios' && (
					<ModalFooter>
						<Button variant='outline' size='sm' action='secondary' mr='$3' onPress={cancelDate}>
							<ButtonText>Cancel</ButtonText>
						</Button>
						<Button size='sm' action='positive' borderWidth='$0' onPress={toggleModal}>
							<ButtonText>Confirm</ButtonText>
						</Button>
					</ModalFooter>
				)}
			</ModalContent>
		</Modal>
	);
};

export default DateModal;
