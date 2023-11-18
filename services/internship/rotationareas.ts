import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { RotationAreas } from '../../models/rotationareas';
import { useMutation } from '@tanstack/react-query';
import { useFetchedRotationAreas } from '../../providers/rotationareas';

interface Rotation {
	internship_area_id: string;
}

const rotationAreas = async (data: Rotation) => {
	const token = await secureStore.getItemAsync('token').then((data) => data);
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	const url = baseUrl + 'api/internship/rotation_areas';

	const config: AxiosRequestConfig = {
		method: 'POST',
		url,
		data,
	};

	const response: RotationAreas = await axios(config).then((res) => res.data);

	return response;
};

const useRotationAreas = (successFn: () => void) => {
	const { setRotationAreas } = useFetchedRotationAreas();
	return useMutation({
		mutationFn: rotationAreas,
		onSuccess: (data) => {
			setRotationAreas(data);
			successFn();
		},
	});
};

export default useRotationAreas;
