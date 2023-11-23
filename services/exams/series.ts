import { useQuery } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { Series } from '../../models/series';

const examSeries = async (index_id: string) => {
	const token = await secureStore.getItemAsync('token').then((data) => data);
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	const url = baseUrl + 'api/exams/series?index_id=' + index_id;

	const config: AxiosRequestConfig = {
		method: 'GET',
		url,
	};

	const response: Series[] = await axios(config).then((res) => res.data);

	return response;
};

const useExamSeries = (index_id: string) =>
	useQuery({
		queryKey: ['checkin-hist'],
		queryFn: () => examSeries(index_id),
	});

export default useExamSeries;
