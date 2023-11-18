import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { RotationActivity } from '../../models/rotationactivity';
import { useQuery } from '@tanstack/react-query';

const rotationActivities = async () => {
	const token = await secureStore.getItemAsync('token').then((data) => data);
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	const url = baseUrl + 'api/internship/rotation_activities/get';

	const config: AxiosRequestConfig = {
		method: 'GET',
		url,
	};

	const response: RotationActivity[] = await axios(config).then(
		(res) => res.data
	);

	response.sort(
		(a, b) =>
			new Date(b.activity_date).getTime() - new Date(a.activity_date).getTime()
	);

	return response;
};

const useRotationActivities = () =>
	useQuery({
		queryKey: ['rotation-activities'],
		queryFn: rotationActivities,
	});

export default useRotationActivities;
