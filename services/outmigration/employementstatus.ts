import * as secureStore from 'expo-secure-store';
import axios, { AxiosRequestConfig } from 'axios';
import { baseUrl } from '../../constants/baseurl';
import { useQuery } from '@tanstack/react-query';
import { EmploymentStatus } from '../../models/employmentstatus';

const employmentStatus = async () => {
	const token = await secureStore.getItemAsync('token').then((data) => data);
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	const url = baseUrl + 'api/outmigration/employmentstatus';

	const config: AxiosRequestConfig = {
		method: 'GET',
		url,
	};

	const response: EmploymentStatus = await axios(config).then((res) => res.data);

	return response;
};

const useEmploymentStatus = () => {
  return useQuery({
    queryKey: ['employment-status'],
    queryFn: employmentStatus
  })
}

export default useEmploymentStatus;