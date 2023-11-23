import { useQuery } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { Employer } from '../../models/employers';

const allEmployers = async () => {
	const token = await secureStore.getItemAsync('token').then((data) => data);
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	const url = baseUrl + 'api/licencing/employers';

	const config: AxiosRequestConfig = {
		method: 'GET',
		url,
	};

	const response: Employer[] = await axios(config).then((res) => {
		return res.data;
	});

	return response;
};

const useEmployers = () =>
	useQuery({
		queryKey: ['employers'],
		queryFn: allEmployers,
	});

export default useEmployers;
