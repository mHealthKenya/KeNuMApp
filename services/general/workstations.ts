import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { useQuery } from '@tanstack/react-query';
import { County } from '../../models/counties';
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

const useWorkStations = (id: string) =>
	useQuery({
		queryKey: ['workstations', id],
		queryFn: () => workStations(id),
		enabled: !!id,
	});

export default useWorkStations;
