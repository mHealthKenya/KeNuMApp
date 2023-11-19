import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { ExamApplication } from '../../models/examapplications';
import { useQuery } from '@tanstack/react-query';
import { ExamResult } from '../../models/results';

const examResults = async (index_id: string) => {
	const token = await secureStore.getItemAsync('token').then((data) => data);
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	const url = baseUrl + 'api/exams/results?index_id=' + index_id;

	const config: AxiosRequestConfig = {
		method: 'GET',
		url,
	};

	const response: ExamResult[] = await axios(config).then((res) => res.data);

	return response;
};

const useExamResults = (index_id: string) =>
	useQuery({
		queryKey: ['exam-results'],
		queryFn: () => examResults(index_id),
	});

export default useExamResults;
