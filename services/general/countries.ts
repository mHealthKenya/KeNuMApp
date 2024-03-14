import { useQuery } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { County } from '../../models/counties';
import { Countries, Country } from '../../models/countries';

const getCountries = async () => {
	const token = await secureStore.getItemAsync('token').then((data) => data);
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	const url = baseUrl + 'api/countries/all';

	const config: AxiosRequestConfig = {
		method: 'GET',
		url,
	};

	const response: Countries = await axios(config).then((res) => {
		return res.data;
	});

	return response;
};

const useGetCountries = () =>
	useQuery({
		queryKey: ['countries'],
		queryFn: getCountries,
	});

export default useGetCountries;
