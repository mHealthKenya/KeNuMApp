import {
	Button,
	ButtonText,
	Center,
	CloseIcon,
	Heading,
	Icon,
	Modal,
	ModalBackdrop,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Text,
} from '@gluestack-ui/themed';
import React, {FC} from 'react';

const OutModal: FC<{show: boolean; toggleModal: () => void}> = ({show, toggleModal}) => {
	const ref = React.useRef(null);
	return (
		<Center h={300}>
			<Modal
				isOpen={show}
				onClose={() => {
					toggleModal();
				}}
				finalFocusRef={ref}>
				<ModalBackdrop />
				<ModalContent>
					<ModalHeader>
						<Heading size='lg'>Engage with Modals</Heading>
						<ModalCloseButton>
							<Icon as={CloseIcon} />
						</ModalCloseButton>
					</ModalHeader>
					<ModalBody>
						<Text>
							Elevate user interactions with our versatile modals. Seamlessly integrate notifications, forms, and media
							displays. Make an impact effortlessly.
						</Text>
					</ModalBody>
					<ModalFooter>
						<Button
							variant='outline'
							size='sm'
							action='secondary'
							mr='$3'
							onPress={() => {
								toggleModal();
							}}>
							<ButtonText>Cancel</ButtonText>
						</Button>
						<Button
							size='sm'
							action='positive'
							borderWidth='$0'
							onPress={() => {
								toggleModal();
							}}>
							<ButtonText>Explore</ButtonText>
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Center>
	);
};

export default OutModal;
