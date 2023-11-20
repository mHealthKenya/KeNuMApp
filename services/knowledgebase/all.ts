import { useQuery } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { KnowledgeBase } from '../../models/knowledgebase';

const allKnow = async () => {
	const token = await secureStore.getItemAsync('token').then((data) => data);
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	const url = baseUrl + 'api/kbase';

	const config: AxiosRequestConfig = {
		method: 'GET',
		url,
	};

	const response: KnowledgeBase[] = await axios(config).then((res) => {
		return res.data;
	});

	return response;
};

const useKnowledge = () =>
	useQuery({
		queryKey: ['knowledge'],
		queryFn: allKnow,
	});

export default useKnowledge;
