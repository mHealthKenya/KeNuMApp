import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { useQuery } from '@tanstack/react-query';
import { CPDCategory } from '../../models/cpdcategory';
import { CPDEvent } from '../../models/cpdevents';

const cpdEvents = async (index_id?: string) => {
	const token = await secureStore.getItemAsync('token').then((data) => data);
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	const url = baseUrl + 'api/CPD/events?index_id=' + index_id;

	const config: AxiosRequestConfig = {
		method: 'GET',
		url,
	};

	const response: CPDEvent[] = await axios(config).then((res) => res.data);

	return response;
};

const useCPDEvents = (index_id?: string) =>
	useQuery({
		queryKey: ['CPDEvents', index_id],
		queryFn: () => cpdEvents(index_id),
		enabled: !!index_id,
	});

export default useCPDEvents;
