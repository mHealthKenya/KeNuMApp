import * as secureStore from 'expo-secure-store';
import axios, { AxiosRequestConfig } from 'axios';
import { baseUrl } from '../../constants/baseurl';
import { useQuery } from '@tanstack/react-query';
import { OutMigrationReason } from '../../models/outmigration_reason';

const outMigrationReason = async () => {
	const token = await secureStore.getItemAsync('token').then((data) => data);
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	const url = baseUrl + 'api/outmigration/reasons';

	const config: AxiosRequestConfig = {
		method: 'GET',
		url,
	};

	const response: OutMigrationReason = await axios(config).then((res) => res.data);

	return response;
};

const useOutMigrationReason = () => {
  return useQuery({
    queryKey: ['out-migration-reasons'], // unique cache key
    queryFn: outMigrationReason
  })
}

export default useOutMigrationReason;