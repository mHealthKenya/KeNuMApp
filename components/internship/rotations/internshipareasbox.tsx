import {useRouter} from 'expo-router';
import React, {FC} from 'react';
import {Pressable, View, useWindowDimensions} from 'react-native';
import {ActivityIndicator, Icon} from 'react-native-paper';
import {primaryColor} from '../../../constants/Colors';
import useRotationAreas from '../../../services/internship/rotationareas';
import globalStyles from '../../../styles/global';
import {Text} from '../../Themed';

export interface InternShipArea {
	title: string;
	id: string;
}

const InternshipAreaBox: FC<{item: InternShipArea}> = ({item}) => {
	const {width, height} = useWindowDimensions();
	const actualWidth = Math.min(width, height);
	const usableWidth = actualWidth - 20;
	const router = useRouter();

	const successFn = () => {
		router.push('/rotationareas');
	};

	const {mutate, isPending} = useRotationAreas(successFn);

	return (
		<Pressable
			className='flex bg-[#FFFFFF] m-2 py-8 px-2 rounded-lg'
			onPress={() =>
				mutate({
					internship_area_id: item.id,
				})
			}>
			<View style={[{justifyContent: 'space-between', alignItems: 'center'}, globalStyles.row]}>
				<View
					style={[
						{
							width: usableWidth * 0.8,
						},
					]}>
					<View
						style={{
							paddingHorizontal: 10,
						}}>
						<Text className='text-xl'>{item.title}</Text>
					</View>
				</View>
				{isPending ? <ActivityIndicator size={30} color={primaryColor} /> : <Icon size={30} source='chevron-right' />}
			</View>
		</Pressable>
	);
};

export default InternshipAreaBox;
