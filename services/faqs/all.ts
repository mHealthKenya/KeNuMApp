import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { useQuery } from '@tanstack/react-query';
import { RegistrationApplication } from '../../models/regapplications';
import { FAQ } from '../../models/faqs';

const allFAQS = async () => {
	const token = await secureStore.getItemAsync('token').then((data) => data);
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	const url = baseUrl + 'api/faqs';

	const config: AxiosRequestConfig = {
		method: 'GET',
		url,
	};

	const response: FAQ[] = await axios(config).then((res) => {
		return res.data;
	});

	return response;
};

const useAllFAQS = () =>
	useQuery({
		queryKey: ['faqs'],
		queryFn: allFAQS,
	});

export default useAllFAQS;
