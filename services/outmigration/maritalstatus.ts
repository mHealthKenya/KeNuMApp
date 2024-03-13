import * as secureStore from 'expo-secure-store';
import axios, { AxiosRequestConfig } from 'axios';
import { baseUrl } from '../../constants/baseurl';
import { useQuery } from '@tanstack/react-query';
import { MaritalStatus } from '../../models/maritalstatus';

const maritalStatus = async () => {
	const token = await secureStore.getItemAsync('token').then((data) => data);
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	const url = baseUrl + 'api/outmigration/maritalstatus';

	const config: AxiosRequestConfig = {
		method: 'GET',
		url,
	};

	const response: MaritalStatus = await axios(config).then((res) => res.data);

	return response;
};

const useMaritalStatus = () => {
  return useQuery({
    queryKey: ['marital-status'],
    queryFn: maritalStatus
  })
}

export default useMaritalStatus;