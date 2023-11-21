import { useQuery } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { ExamApplication } from '../../models/examapplications';

const examApplications = async (index_id: string) => {
	const token = await secureStore.getItemAsync('token').then((data) => data);
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	const url = baseUrl + 'api/exams/applications?index_id=' + index_id;

	const config: AxiosRequestConfig = {
		method: 'GET',
		url,
	};

	const response: ExamApplication[] = await axios(config).then(
		(res) => res.data
	);

	response.sort(
		(a, b) =>
			new Date(b.application_date).getTime() -
			new Date(a.application_date).getTime()
	);

	return response;
};

const useExamApplications = (index_id: string) =>
	useQuery({
		queryKey: ['exam-applications'],
		queryFn: () => examApplications(index_id),
	});

export default useExamApplications;
