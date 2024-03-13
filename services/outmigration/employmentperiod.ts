import * as secureStore from 'expo-secure-store';
import axios, { AxiosRequestConfig } from 'axios';
import { baseUrl } from '../../constants/baseurl';
import { EmploymentPeriod } from '../../models/employmentperiod';
import { useQuery } from '@tanstack/react-query';

const employmentPeriod = async () => {
	const token = await secureStore.getItemAsync('token').then((data) => data);
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	const url = baseUrl + 'api/outmigration/employmentperiods';

	const config: AxiosRequestConfig = {
		method: 'GET',
		url,
	};

	const response: EmploymentPeriod = await axios(config).then((res) => res.data);

	return response;
};

const useEmploymentPeriod = () => {
  return useQuery({
    queryKey: ['employment-period'],
    queryFn: employmentPeriod
  })
}

export default useEmploymentPeriod;