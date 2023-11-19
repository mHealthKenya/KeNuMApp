import { useQuery } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { Series } from '../../models/series';

const examSeries = async () => {
	const token = await secureStore.getItemAsync('token').then((data) => data);
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	const url = baseUrl + 'api/exams/series?index_id=105501';

	const config: AxiosRequestConfig = {
		method: 'GET',
		url,
	};

	const response: Series[] = await axios(config).then((res) => res.data);

	return response;
};

const useExamSeries = () =>
	useQuery({
		queryKey: ['checkin-hist'],
		queryFn: examSeries,
	});

export default useExamSeries;
