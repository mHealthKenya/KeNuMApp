import { useQuery } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { CPDActivity } from '../../models/activity';

const activities = async (index_id: string) => {
	const token = await secureStore.getItemAsync('token').then((data) => data);
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	const url = baseUrl + 'api/CPD/activity_history?index-id=' + index_id;

	const config: AxiosRequestConfig = {
		method: 'GET',
		url,
	};

	const response: CPDActivity[] = await axios(config).then((res) => res.data);

	return response;
};

const useCPDActivities = (index_id: string) =>
	useQuery({
		queryKey: ['cpd-activities', index_id],
		queryFn: () => activities(index_id),
		enabled: !!index_id,
	});

export default useCPDActivities;
