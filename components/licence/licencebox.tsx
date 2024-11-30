import {useAtom} from 'jotai';
import React, {FC} from 'react';
import {View} from 'react-native';
import {Divider} from 'react-native-paper';
import {diasporaAtom} from '../../atoms/diaporaatom';
import globalStyles from '../../styles/global';
import {Text} from '../Themed';

export interface Item {
	title: string;
	id: string;
}

const LicenceApplyBox: FC<{county: Item; workstation: Item}> = ({county, workstation}) => {
	const [diaspora, _] = useAtom(diasporaAtom);

	return (
		<View className='p-2'>
			<View className='flex py-4 bg-white rounded-xl px-2'>
				<View style={[globalStyles.row, {justifyContent: 'space-between', alignItems: 'center'}]}>
					<View style={[globalStyles.column]}>
						<View
							style={{
								paddingHorizontal: 10,
							}}>
							<Text className='text-xl' bold>
								{diaspora ? 'Diaspora' : county.title}
							</Text>
							<Divider
								style={{
									marginTop: 5,
								}}
							/>
						</View>
						<View className='p-2'>
							<Text className='text-lg'>{diaspora ? 'Out country application' : workstation.title}</Text>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
};

export default LicenceApplyBox;
