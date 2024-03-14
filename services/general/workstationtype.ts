import { useQuery } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { WorkStationTypes } from '../../models/workStationTypes';

const workStationsTypes = async () => {
	const token = await secureStore.getItemAsync('token').then((data) => data);
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	const url = baseUrl + 'api/workstations/types';

	const config: AxiosRequestConfig = {
		method: 'GET',
		url,
	};

	const response: WorkStationTypes = await axios(config).then((res) => res.data);

	return response;
};


const useWorkStationsTypes = () => {
	return useQuery({
    queryKey: ['workStationsTypes'],
    queryFn: workStationsTypes,
  });
}



export default useWorkStationsTypes;
