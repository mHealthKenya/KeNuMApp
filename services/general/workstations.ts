import { useQuery } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { WorkStation } from '../../models/workstations';

const workStations = async (id: string) => {
	const token = await secureStore.getItemAsync('token').then((data) => data);
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	const url = baseUrl + 'api/workstations?county_id=' + id;

	const config: AxiosRequestConfig = {
		method: 'GET',
		url,
	};

	const response: WorkStation[] = await axios(config).then((res) => res.data);

	return response;
};

const workStationsAll = async () => {
	const token = await secureStore.getItemAsync('token').then((data) => data);
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	const url = baseUrl + 'api/workstations/all';

	const config: AxiosRequestConfig = {
		method: 'GET',
		url,
	};

	const response: WorkStation[] = await axios(config).then((res) => res.data);

	return response;
};

const useWorkStations = (id: string) =>
	useQuery({
		queryKey: ['workstations', id],
		queryFn: () => workStations(id),
		enabled: !!id,
	});


export const useAllWorkStations = () => useQuery({
	queryKey: ['workstations-all'],
	queryFn: workStationsAll
})

export default useWorkStations;
