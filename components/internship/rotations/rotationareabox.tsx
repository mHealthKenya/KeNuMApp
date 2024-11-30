import {ImageSource} from 'expo-image';
import {useRouter} from 'expo-router';
import React, {FC} from 'react';
import {Pressable, View, useWindowDimensions} from 'react-native';
import {ActivityIndicator, Divider, Icon} from 'react-native-paper';
import {primaryColor} from '../../../constants/Colors';
import {RotationArea} from '../../../models/rotationareas';
import useRotationCompetencies from '../../../services/internship/rotationcompetencies';
import globalStyles from '../../../styles/global';
import {Text} from '../../Themed';

export interface InternBox {
	title: string;
	content: string;
	backgroundColor: string;
	path: ImageSource;
	route: any;
}

const RotationAreaBox: FC<{area: RotationArea}> = ({area}) => {
	const {width, height} = useWindowDimensions();
	const actualWidth = Math.min(width, height);
	const usableWidth = actualWidth - 20;

	const router = useRouter();

	const successFn = () => {
		router.push('/competencies');
	};

	const {mutate, isPending} = useRotationCompetencies(successFn);

	return (
		<Pressable
			className='flex bg-[#FFFFFF] py-8 rounded-lg m-2'
			onPress={() =>
				mutate({
					rotation_id: area.rotation_id,
				})
			}>
			<View style={[globalStyles.row, {justifyContent: 'space-between', alignItems: 'center'}]}>
				<View
					style={[
						globalStyles.column,
						{
							width: usableWidth * 0.8,
							justifyContent: 'space-between',
						},
					]}>
					<View className='p-2'>
						<Text className='text-xl' bold>
							{area.rotation_area}
						</Text>
						<Divider
							style={{
								marginTop: 5,
							}}
						/>
					</View>
					<View
						style={{
							padding: 10,
						}}>
						<Text className='text-lg'>Required duration {area.rotation_duration} days</Text>
					</View>
				</View>
				{isPending ? <ActivityIndicator size={30} color={primaryColor} /> : <Icon size={30} source='chevron-right' />}
			</View>
		</Pressable>
	);
};

export default RotationAreaBox;
