import { useQuery } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { County } from '../../models/counties';

const allCounties = async () => {
	const token = await secureStore.getItemAsync('token').then((data) => data);
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	const url = baseUrl + 'api/counties';

	const config: AxiosRequestConfig = {
		method: 'GET',
		url,
	};

	const response: County[] = await axios(config).then((res) => {
		return res.data;
	});

	return response;
};

const useCounties = () =>
	useQuery({
		queryKey: ['counties'],
		queryFn: allCounties,
	});

export default useCounties;
