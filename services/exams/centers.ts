import { useQuery } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { ExamCenter } from '../../models/examcenters';

const examCenters = async () => {
	const token = await secureStore.getItemAsync('token').then((data) => data);
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	const url = baseUrl + 'api/exams/centers';

	const config: AxiosRequestConfig = {
		method: 'GET',
		url,
	};

	const response: ExamCenter[] = await axios(config).then((res) => res.data);

	return response;
};

const useExamCenters = () =>
	useQuery({
		queryKey: ['exam-centers'],
		queryFn: examCenters,
	});

export default useExamCenters;
