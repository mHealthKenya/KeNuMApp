import * as secureStore from 'expo-secure-store';
import axios, { AxiosRequestConfig } from 'axios';
import { baseUrl } from '../../constants/baseurl';
import { useQuery } from '@tanstack/react-query';
import { PlanToReturn } from '../../models/plantoreturn';

const planToReturn = async () => {
	const token = await secureStore.getItemAsync('token').then((data) => data);
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	const url = baseUrl + 'api/outmigration/planningtoreturn';

	const config: AxiosRequestConfig = {
		method: 'GET',
		url,
	};

	const response: PlanToReturn = await axios(config).then((res) => res.data);

	return response;
};

const usePlanToReturn = () => {
  return useQuery({
    queryKey: ['plan-to-return'],
    queryFn: planToReturn
  })
}

export default usePlanToReturn;