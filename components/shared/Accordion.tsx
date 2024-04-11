import React, {FC, ReactNode} from 'react';
// import {View} from 'react-native';
import {ChevronDown} from '@tamagui/lucide-icons';
import {Accordion, Paragraph, Square, View as TView} from 'tamagui';
import {View} from 'react-native';

const AccordionShared: FC<{children: ReactNode; title: string | ReactNode}> = ({children, title}) => {
	return (
		<View className='m-1 rounded'>
			<Accordion
				overflow='hidden'
				type='single'
				collapsible
				className='rounded-xl'
				style={{
					borderRadius: 15,
				}}>
				<Accordion.Item value='a1'>
					<Accordion.Trigger flexDirection='row' justifyContent='space-between'>
						{({open}: any) => (
							<>
								{typeof title === 'string' ? (
									<Paragraph
										style={{
											width: '90%',
										}}>
										{title}
									</Paragraph>
								) : (
									<TView
										style={{
											width: '90%',
										}}>
										{title}
									</TView>
								)}

								<Square animation='quick' rotate={open ? '180deg' : '0deg'}>
									<ChevronDown size='$1' />
								</Square>
							</>
						)}
					</Accordion.Trigger>
					<Accordion.Content>{children}</Accordion.Content>
				</Accordion.Item>
			</Accordion>
		</View>
	);
};

export default AccordionShared;
