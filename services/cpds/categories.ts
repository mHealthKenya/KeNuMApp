import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { useQuery } from '@tanstack/react-query';
import { CPDCategory } from '../../models/cpdcategory';

const categories = async () => {
	const token = await secureStore.getItemAsync('token').then((data) => data);
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	const url = baseUrl + 'api/CPD/categories';

	const config: AxiosRequestConfig = {
		method: 'GET',
		url,
	};

	const response: CPDCategory[] = await axios(config).then((res) => res.data);

	return response;
};

const useCPDCategories = () =>
	useQuery({
		queryKey: ['CPDCategories'],
		queryFn: categories,
	});

export default useCPDCategories;
